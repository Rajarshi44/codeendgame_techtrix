'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface GridScanBgProps {
  lineThickness?: number
  linesColor?: string
  gridScale?: number
  scanColor?: string
  scanOpacity?: number
  scanDuration?: number
  scanDelay?: number
  noiseIntensity?: number
  sensitivity?: number
}

const vert = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
uniform float uNoise;
uniform float uScanDuration;
uniform float uScanDelay;
varying vec2 vUv;

void mainImage(out vec4 fragColor,in vec2 fragCoord){
  vec2 p=(2.0*fragCoord-iResolution.xy)/iResolution.y;
  vec3 ro=vec3(0.0);
  vec3 rd=normalize(vec3(p,2.0));
  vec2 skew=clamp(uSkew,vec2(-0.7),vec2(0.7));
  rd.xy+=skew*rd.z;
  float minT=1e20;
  vec2 gridUV=vec2(0.0);
  float gs=max(1e-5,uGridScale);

  for(int i=0;i<4;i++){
    float isY=float(i<2);
    float pos=mix(-0.2,0.2,float(i))*isY+mix(-0.5,0.5,float(i-2))*(1.0-isY);
    float num=pos-isY*ro.y-(1.0-isY)*ro.x;
    float den=isY*rd.y+(1.0-isY)*rd.x;
    float t=num/den;
    vec3 h=ro+rd*t;
    h.xy+=skew*0.15*smoothstep(0.0,3.0,h.z);
    bool use=t>0.0&&t<minT;
    gridUV=use?mix(h.zy,h.xz,isY)/gs:gridUV;
    minT=use?t:minT;
  }

  vec3 hit=ro+rd*minT;
  float dist=length(hit-ro);
  float fade=exp(-dist*2.0);

  float fx=fract(gridUV.x),fy=fract(gridUV.y);
  float ax=min(fx,1.0-fx),ay=min(fy,1.0-fy);
  float wx=fwidth(gridUV.x),wy=fwidth(gridUV.y);
  float hp=max(0.0,uLineThickness)*0.5;
  float lineX=1.0-smoothstep(hp*wx,hp*wx+wx,ax);
  float lineY=1.0-smoothstep(hp*wy,hp*wy+wy,ay);
  float lineMask=max(lineX,lineY);

  float dur=max(0.05,uScanDuration);
  float del=max(0.0,uScanDelay);
  float cycle=dur+del;
  float tC=mod(iTime,cycle);
  float ph=clamp((tC-del)/dur,0.0,1.0);
  float t2=mod(max(0.0,iTime-del),2.0*dur);
  float phase=(t2<dur)?(t2/dur):(1.0-(t2-dur)/dur);
  float scanZ=phase*2.0;
  float dz=abs(hit.z-scanZ);
  float sigma=0.18;
  float band=exp(-0.5*dz*dz/(sigma*sigma));
  float headF=smoothstep(0.0,0.3,phase);
  float tailF=1.0-smoothstep(0.7,1.0,phase);
  float pw=headF*tailF;
  float pulse=band*pw*uScanOpacity;
  float aura=exp(-0.5*dz*dz/(0.36*0.36))*0.25*pw*uScanOpacity;

  vec3 color=uLinesColor*lineMask*fade+uScanColor*(pulse+aura);
  float n=fract(sin(dot(gl_FragCoord.xy+vec2(iTime*123.4),vec2(12.9898,78.233)))*43758.5453);
  color+=(n-0.5)*uNoise;
  color=clamp(color,0.0,1.0);
  float alpha=clamp(max(lineMask*fade,pulse),0.0,1.0);
  fragColor=vec4(color,alpha);
}

void main(){vec4 c;mainImage(c,vUv*iResolution.xy);gl_FragColor=c;}
`

function srgbColor(hex: string) {
  return new THREE.Color(hex).convertSRGBToLinear()
}

export default function GridScanBg({
  lineThickness = 1,
  linesColor = '#2F293A',
  gridScale = 0.1,
  scanColor = '#FF9FFC',
  scanOpacity = 0.4,
  scanDuration = 2.0,
  scanDelay = 2.0,
  noiseIntensity = 0.01,
  sensitivity = 0.55,
}: GridScanBgProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const s = THREE.MathUtils.clamp(sensitivity, 0, 1)
    const skewScale = THREE.MathUtils.lerp(0.06, 0.2, s)

    const uniforms: Record<string, THREE.IUniform> = {
      iResolution: { value: new THREE.Vector3(el.clientWidth, el.clientHeight, renderer.getPixelRatio()) },
      iTime: { value: 0 },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: srgbColor(linesColor) },
      uScanColor: { value: srgbColor(scanColor) },
      uGridScale: { value: gridScale },
      uScanOpacity: { value: scanOpacity },
      uNoise: { value: noiseIntensity },
      uScanDuration: { value: scanDuration },
      uScanDelay: { value: scanDelay },
    }

    const mat = new THREE.ShaderMaterial({
      uniforms, vertexShader: vert, fragmentShader: frag,
      transparent: true, depthWrite: false, depthTest: false,
    })
    const scene = new THREE.Scene()
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))

    const target = new THREE.Vector2(0, 0)
    const current = new THREE.Vector2(0, 0)

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      target.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1))
    }
    const onLeave = () => { target.set(0, 0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight)
      uniforms.iResolution.value.set(el.clientWidth, el.clientHeight, renderer.getPixelRatio())
    }
    window.addEventListener('resize', onResize)

    let raf = 0
    const tick = () => {
      current.lerp(target, 0.05)
      uniforms.uSkew.value.set(current.x * skewScale, -current.y * skewScale * 1.4)
      uniforms.iTime.value = performance.now() / 1000
      renderer.render(scene, cam)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      mat.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [lineThickness, linesColor, gridScale, scanColor, scanOpacity, scanDuration, scanDelay, noiseIntensity, sensitivity])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}
