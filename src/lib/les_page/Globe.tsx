"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import * as THREE from "../../../node_modules/three"
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls"

import type { JSX } from "react/jsx-runtime"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Interfaces pour les types de données
interface PollutionDetail {
  [key: string]: string
}

interface ContinentData {
  level: string
  details: PollutionDetail
  color: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface PollutionDataType {
  [key: string]: ContinentData
}

interface SelectedContinent extends ContinentData {
  name: string
}

// Données de pollution par continent


const pollutionData: PollutionDataType = {
  "North America": {
    level: "300,000-1,000,000",
    details: {
      "CO2 Emissions (tonnes)": "5.3 billion",
      "Air Quality Index": "Moderate",
      "Water Pollution Level": "Medium",
      "Waste Generation": "High",
    },
    color: "#8BC34A", // vert
    coordinates: { lat: 40, lng: -100 },
  },
  "South America": {
    level: "100,000-300,000",
    details: {
      "CO2 Emissions (tonnes)": "1.3 billion",
      "Air Quality Index": "Good to Moderate",
      "Water Pollution Level": "Medium-High",
      "Waste Generation": "Medium",
    },
    color: "#8BC34A", // vert
    coordinates: { lat: -20, lng: -60 },
  },
  Europe: {
    level: "100,000-300,000",
    details: {
      "CO2 Emissions (tonnes)": "4.1 billion",
      "Air Quality Index": "Moderate",
      "Water Pollution Level": "Medium",
      "Waste Generation": "High",
    },
    color: "#8BC34A", // vert
    coordinates: { lat: 10, lng: 20 },
  },
  Africa: {
    level: "0-1,000",
    details: {
      "CO2 Emissions (tonnes)": "1.2 billion",
      "Air Quality Index": "Moderate to Poor",
      "Water Pollution Level": "High",
      "Waste Generation": "Low",
    },
    color: "#8E24AA", // violet
    coordinates: { lat: 0, lng: 20 },
  },
  Asia: {
    level: "1,000,000+",
    details: {
      "CO2 Emissions (tonnes)": "17.4 billion",
      "Air Quality Index": "Poor",
      "Water Pollution Level": "High",
      "Waste Generation": "Very High",
    },
    color: "#D4E157", // jaune-vert
    coordinates: { lat: 40, lng: 100 },
  },
  Oceania: {
    level: "100,000-300,000",
    details: {
      "CO2 Emissions (tonnes)": "0.5 billion",
      "Air Quality Index": "Good",
      "Water Pollution Level": "Low",
      "Waste Generation": "Medium",
    },
    color: "#8BC34A", // vert
    coordinates: { lat: -25, lng: 135 },
  },
  Antarctica: {
    level: "0-1,000",
    details: {
      "CO2 Emissions (tonnes)": "Minimal",
      "Air Quality Index": "Excellent",
      "Water Pollution Level": "Very Low",
      "Waste Generation": "Minimal",
    },
    color: "#8E24AA", // violet
    coordinates: { lat: -90, lng: 0 },
  },
}

// Fonction pour convertir lat/lng en coordonnées 3D sur une sphère
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new THREE.Vector3(x, y, z)
}

// Fonction pour créer une étiquette de continent
function createContinentLabel(name: string, position: THREE.Vector3, scene: THREE.Scene): THREE.Sprite {
  // Créer un canvas pour le texte
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Impossible de créer le contexte 2D")
  }

  canvas.width = 256
  canvas.height = 128

  // Dessiner le fond
  context.fillStyle = "rgba(0, 0, 0, 0.7)"
  context.fillRect(0, 0, canvas.width, canvas.height)

  // Dessiner le texte
  context.font = "bold 36px Arial"
  context.fillStyle = "white"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillText(name, canvas.width / 2, canvas.height / 2)

  // Créer une texture à partir du canvas
  const texture = new THREE.CanvasTexture(canvas)

  // Créer un sprite avec la texture
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.position.copy(position)
  sprite.position.multiplyScalar(1.2) // Positionner légèrement au-dessus de la surface
  sprite.scale.set(0.5, 0.25, 1)

  scene.add(sprite)

  return sprite
}

 function Globe(): JSX.Element {
  const [selectedContinent, setSelectedContinent] = useState<SelectedContinent | null>(null)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const markersRef = useRef<{ [key: string]: THREE.Mesh }>({})
  const labelsRef = useRef<{ [key: string]: THREE.Sprite }>({})

  // Variables pour la gestion des clics
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  let isMouseDown = false
  let mouseDownTime = 0

  // Initialisation de Three.js
  useEffect(() => {
    if (!containerRef.current) return

    // Création de la scène
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Création de la caméra
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 2.5
    cameraRef.current = camera

    // Création du renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0xf0f0f0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Ajout des contrôles
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 1.5
    controls.maxDistance = 4
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controlsRef.current = controls

    // Création du globe
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
      (texture: unknown) => {
        const geometry = new THREE.SphereGeometry(1, 64, 64)
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.1,
          roughness: 0.8,
        })
        const globe = new THREE.Mesh(geometry, material)
        scene.add(globe)
        globeRef.current = globe

        // Ajout des marqueurs pour les continents
        Object.entries(pollutionData).forEach(([name, data]) => {
          const position = latLngToVector3(data.coordinates.lat, data.coordinates.lng, 1.05)

          // Créer le marqueur
          const markerGeometry = new THREE.SphereGeometry(0.03, 16, 16)
          const markerMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(data.color),
            emissive: new THREE.Color("#000000"),
            emissiveIntensity: 0,
          })

          const marker = new THREE.Mesh(markerGeometry, markerMaterial)
          marker.position.copy(position)
          marker.userData = { name, data }
          scene.add(marker)

          markersRef.current[name] = marker

          // Créer l'étiquette du continent
          const label = createContinentLabel(name, position, scene)
          labelsRef.current[name] = label

          // Cacher l'étiquette par défaut
          label.visible = false
        })
      },
      undefined,
      (error: unknown) => console.error("Erreur de chargement de texture", error),
    )

    // Ajout des lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x083e7d, 0.5)
    scene.add(hemisphereLight)

    // Fonction d'animation
    const animate = (): void => {
      requestAnimationFrame(animate)

      if (controlsRef.current) {
        controlsRef.current.update()
      }

      if (globeRef.current && !isMouseDown) {
        globeRef.current.rotation.y += 0.001
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Gestion du redimensionnement
    const handleResize = (): void => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        rendererRef.current.setSize(width, height)
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()
      }
    }

    window.addEventListener("resize", handleResize)

    // Nettoyage
    return () => {
      window.removeEventListener("resize", handleResize)

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      if (controlsRef.current) {
        controlsRef.current.dispose()
      }
    }
  }, [])

  // Gestion des événements de souris
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMouseDown = (): void => {
    isMouseDown = true
    mouseDownTime = Date.now()
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (isMouseDown && Date.now() - mouseDownTime < 200 && containerRef.current && cameraRef.current) {
      // C'est un clic (moins de 200ms entre mousedown et mouseup)
      const rect = containerRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, cameraRef.current)

      // Vérifier les intersections avec les marqueurs
      const markers = Object.values(markersRef.current)
      const intersects = raycaster.intersectObjects(markers)

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object
        const userData = selectedObject.userData as { name: string; data: ContinentData }

        // Mettre à jour le continent sélectionné
        setSelectedContinent({ ...userData.data, name: userData.name })
        setShowDetails(true)

        // Réinitialiser tous les marqueurs et étiquettes
        Object.values(markersRef.current).forEach((marker) => {
          if (marker.material instanceof THREE.MeshStandardMaterial) {
            marker.material.emissive = new THREE.Color("#000000")
            marker.material.emissiveIntensity = 0
          }
        })

        Object.values(labelsRef.current).forEach((label) => {
          label.visible = false
        })

        // Mettre en surbrillance le marqueur sélectionné
        if (selectedObject.material instanceof THREE.MeshStandardMaterial) {
          selectedObject.material.emissive = new THREE.Color("#ffffff")
          selectedObject.material.emissiveIntensity = 0.5
        }

        // Afficher l'étiquette du continent sélectionné
        if (labelsRef.current[userData.name]) {
          labelsRef.current[userData.name].visible = true
        }

        // Animer la caméra vers le continent sélectionné
        if (controlsRef.current && cameraRef.current) {
          const position = selectedObject.position.clone()
          const distance = cameraRef.current.position.distanceTo(new THREE.Vector3(0, 0, 0))

          // Calculer la nouvelle position de la caméra
          const direction = position.clone().normalize()
          const newPosition = direction.multiplyScalar(distance)

          // Animation de la caméra
          const startPosition = cameraRef.current.position.clone()
          const startTime = Date.now()
          const duration = 1000 // 1 seconde

          const animateCamera = (): void => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Fonction d'easing
            const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
            const easedProgress = easeOutCubic(progress)

            // Interpoler la position
            if (cameraRef.current) {
              cameraRef.current.position.lerpVectors(startPosition, newPosition, easedProgress)
            }

            // Continuer l'animation si nécessaire
            if (progress < 1) {
              requestAnimationFrame(animateCamera)
            }
          }

          animateCamera()
        }
      } else if (globeRef.current) {
        // Vérifier les intersections avec le globe
        const globeIntersects = raycaster.intersectObject(globeRef.current)

        if (globeIntersects.length > 0) {
          const intersect = globeIntersects[0]
          const point = intersect.point.clone().normalize()

          // Convertir le point d'intersection en coordonnées lat/lng
          const lat = 90 - (Math.acos(point.y) * 180) / Math.PI
          const lng = (((Math.atan2(point.z, point.x) * 180) / Math.PI + 270) % 360) - 180

          // Déterminer le continent le plus proche
          let closestContinent = ""
          let minDistance = Number.POSITIVE_INFINITY

          Object.entries(pollutionData).forEach(([name, data]) => {
            const continentLat = data.coordinates.lat
            const continentLng = data.coordinates.lng

            // Calculer la distance (approximative) entre les points
            const distance = Math.sqrt(Math.pow(lat - continentLat, 2) + Math.pow(lng - continentLng, 2))

            if (distance < minDistance) {
              minDistance = distance
              closestContinent = name
            }
          })

          // Si on est assez proche d'un continent, le sélectionner
          if (minDistance < 30 && closestContinent) {
            setSelectedContinent({
              ...pollutionData[closestContinent],
              name: closestContinent,
            })
            setShowDetails(true)

            // Réinitialiser tous les marqueurs et étiquettes
            Object.values(markersRef.current).forEach((marker) => {
              if (marker.material instanceof THREE.MeshStandardMaterial) {
                marker.material.emissive = new THREE.Color("#000000")
                marker.material.emissiveIntensity = 0
              }
            })

            Object.values(labelsRef.current).forEach((label) => {
              label.visible = false
            })

            // Mettre en surbrillance le marqueur sélectionné
            if (
              markersRef.current[closestContinent] &&
              markersRef.current[closestContinent].material instanceof THREE.MeshStandardMaterial
            ) {
              markersRef.current[closestContinent].material.emissive = new THREE.Color("#ffffff")
              markersRef.current[closestContinent].material.emissiveIntensity = 0.5

              // Afficher l'étiquette du continent sélectionné
              if (labelsRef.current[closestContinent]) {
                labelsRef.current[closestContinent].visible = true
              }
            }
          }
        }
      }
    }

    isMouseDown = false
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (containerRef.current && cameraRef.current && globeRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, cameraRef.current)

      // Vérifier les intersections avec les marqueurs
      const markers = Object.values(markersRef.current)
      const intersects = raycaster.intersectObjects(markers)

      if (intersects.length > 0) {
        document.body.style.cursor = "pointer"
      } else {
        // Vérifier les intersections avec le globe
        const globeIntersects = raycaster.intersectObject(globeRef.current)

        if (globeIntersects.length > 0) {
          const intersect = globeIntersects[0]
          const point = intersect.point.clone().normalize()

          // Convertir le point d'intersection en coordonnées lat/lng
          const lat = 90 - (Math.acos(point.y) * 180) / Math.PI
          const lng = (((Math.atan2(point.z, point.x) * 180) / Math.PI + 270) % 360) - 180

          // Déterminer le continent le plus proche
        //   let closestContinent = ""
          let minDistance = Number.POSITIVE_INFINITY

          Object.entries(pollutionData).forEach(([name, data]) => {
            const continentLat = data.coordinates.lat
            const continentLng = data.coordinates.lng

            // Calculer la distance (approximative) entre les points
            const distance = Math.sqrt(Math.pow(lat - continentLat, 2) + Math.pow(lng - continentLng, 2))

            if (distance < minDistance) {
              minDistance = distance
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const closestContinent = name
            }
          })

          // Si on est assez proche d'un continent, changer le curseur
          if (minDistance < 30) {
            document.body.style.cursor = "pointer"
          } else {
            document.body.style.cursor = "auto"
          }
        } else {
          document.body.style.cursor = "auto"
        }
      }
    }
  }

  return (
    <div className="w-full mx-auto p-5 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Carte de Pollution Mondiale</h1>
      <p className="text-center text-gray-600 mb-5">Cliquez sur un continent pour voir les détails de pollution</p>

      <div
        className="w-full h-[70vh] rounded-lg overflow-hidden mb-5 bg-gray-100 shadow-md relative"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-3 right-3 bg-white/80 p-3 rounded-lg w-44 text-xs z-10">
          <h3 className="font-semibold mb-2 text-sm">Niveau de Pollution</h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#D4E157" }}></div>
              <span>1,000,000+</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#8BC34A" }}></div>
              <span>300,000-1,000,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#8BC34A" }}></div>
              <span>100,000-300,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#26A69A" }}></div>
              <span>50,000-100,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#4DB6AC" }}></div>
              <span>20,000-50,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#3F51B5" }}></div>
              <span>5,000-20,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#673AB7" }}></div>
              <span>1,000-5,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1.5 border border-gray-300" style={{ backgroundColor: "#8E24AA" }}></div>
              <span>0-1,000</span>
            </div>
          </div>
        </div>
      </div>

      {selectedContinent && showDetails && (
        <div className="relative mt-5 animate-fadeIn">
          <Card className="border-l-4 border-l-gray-800 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{selectedContinent.name}</span>
                <div
                  className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: selectedContinent.color }}
                ></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-gray-50 rounded border-l-4 border-l-green-500">
                <strong>Niveau de pollution:</strong>
                <span className="font-bold ml-1.5">{selectedContinent.level}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {Object.entries(selectedContinent.details).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3 bg-gray-50 rounded transition-transform hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <button
            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
            onClick={() => setShowDetails(false)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  )
}

export default Globe
