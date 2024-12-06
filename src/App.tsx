import { useState, useRef, useEffect } from 'react'

const App = () => {
  const [speed, setSpeed] = useState(0)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number>()
  
  const animate = () => {
    setRotation(prev => prev + speed)
    animationRef.current = requestAnimationFrame(animate)
  }
  
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed])

  const increaseClockwise = () => {
    setSpeed(prev => Math.min(prev + 1, 10))
  }

  const increaseCounterClockwise = () => {
    setSpeed(prev => Math.max(prev - 1, -10))
  }

  const createSectorPath = (startAngle: number) => {
    const centerX = 50
    const centerY = 50
    const angle = startAngle * (Math.PI / 180)
    const nextAngle = (startAngle + 60) * (Math.PI / 180)
    
    const x1 = centerX + Math.cos(angle) * 100
    const y1 = centerY + Math.sin(angle) * 100
    const x2 = centerX + Math.cos(nextAngle) * 100
    const y2 = centerY + Math.sin(nextAngle) * 100
    
    return `M${centerX},${centerY} L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="-50 -50 200 200">
          <defs>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <radialGradient
                key={`grad${i}`}
                id={`grad${i}`}
                cx="50%"
                cy="50%"
                r="70.7%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor={`hsl(${angle}, 70%, 60%)`} stopOpacity="0.5" />
                <stop offset="70%" stopColor={`hsl(${angle + 30}, 70%, 60%)`} stopOpacity="0.3" />
                <stop offset="100%" stopColor={`hsl(${angle + 30}, 70%, 60%)`} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={`sector${i}`}
              d={createSectorPath(angle)}
              fill={`url(#grad${i})`}
            />
          ))}
          
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <line
              key={`line${i}`}
              x1="50"
              y1="50"
              x2={50 + Math.cos(angle * Math.PI / 180) * 100}
              y2={50 + Math.sin(angle * Math.PI / 180) * 100}
              stroke="white"
              strokeWidth="0.2"
              strokeOpacity="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 flex flex-col items-center">
        <div className="flex-1 flex items-center justify-center">
          <div 
            className="w-64 h-64 md:w-96 md:h-96"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
            >
              <path
                d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="transition-colors duration-300 hover:stroke-blue-500"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl md:text-2xl">
              {speed}x
            </div>
          </div>
        </div>


      </div>


      <div className="w-full flex absolute bottom-0 justify-center gap-16 mb-[10vh]">
          <button 
            onClick={increaseCounterClockwise}
            className="group relative w-24 h-24 md:w-32 md:h-32"
          >
            <div className="absolute inset-0 bg-white bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all" />
            <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-full group-hover:border-opacity-50 transition-all" />
            <div className="absolute inset-2 border-2 border-white border-opacity-20 rounded-full group-hover:border-opacity-40 transition-all" />
            <div className="absolute inset-4 border border-white border-opacity-10 rounded-full group-hover:border-opacity-30 transition-all" />
          </button>
          
          <button 
            onClick={increaseClockwise}
            className="group relative w-24 h-24 md:w-32 md:h-32"
          >
            <div className="absolute inset-0 bg-white bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all" />
            <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-full group-hover:border-opacity-50 transition-all" />
            <div className="absolute inset-2 border-2 border-white border-opacity-20 rounded-full group-hover:border-opacity-40 transition-all" />
            <div className="absolute inset-4 border border-white border-opacity-10 rounded-full group-hover:border-opacity-30 transition-all" />
          </button>
        </div>
    </div>
  )
}

export default App

