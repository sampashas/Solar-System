import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function Scene() {
  const canvasRef = useRef(null)
  const [sphere, setSphere] = useState(null)
  const [controls, setControls] = useState(null)

  useEffect(() => {
    // сцена
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // камера
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // как рендерится
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })
    renderer.setSize(window.innerWidth, window.innerHeight)

    // загрузчик текстур
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('ava.png')

    // элементы сцены
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
    const sphereMaterial = new THREE.MeshLambertMaterial({ map: texture })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

    // свет
    scene.add(new THREE.AmbientLight(0x222222))

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(20, 20, 0)
    scene.add(light)

    // хелпер
    scene.add(new THREE.AxesHelper(20))

    // контролы
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // анимация
    const animate = () => {
      requestAnimationFrame(animate)
      sphere.rotation.y += 0.01
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return <canvas ref={canvasRef} />
}

export default Scene
