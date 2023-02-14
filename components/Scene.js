import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function Scene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // SETTINGS
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x181818)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
    renderer.setSize(window.innerWidth, window.innerHeight)
    // Helper
    scene.add(new THREE.AxesHelper(20))

    // MOVING
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // LIGHT
    // 1
    var light2 = new THREE.DirectionalLight(0xffffff, 1)
    light2.position.set(20, 20, 200)
    scene.add(light2)
    // 2
    const light = new THREE.PointLight(0xffffff, 1, 1000)
    light.position.set(20, 200, 20)
    scene.add(light)

    // LAYERS
    const geometry = new THREE.SphereGeometry(64, 32, 32)
    const uniforms = {
      time: { type: 'f', value: 1.0 },
      resolution: { type: 'v2', value: new THREE.Vector2() },
    }

    uniforms.resolution.value.x = 500
    uniforms.resolution.value.y = 500

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        uniform vec2 resolution;
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec2 pos = position.xy / resolution.xy;
          pos.y += time * 0.05;
          vec4 modelViewPosition = modelViewMatrix * vec4(pos, 0.0, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;
        }
      `,
      fragmentShader: `
        uniform vec2 resolution;
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec2 pos = vUv;
          pos.y += (sin((pos.x + (time * 0.5)) * 10.0) * 0.1) + (sin((pos.x + (time * 0.5)) * 32.0) * 0.01);
          gl_FragColor = vec4(0.2, 0.4, 0.6, 1.0) * vec4(pos.y);
        }
      `,
    })

    // GET
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const render = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }

    render()
  }, [])

  return <canvas ref={canvasRef} />
}

export default Scene
