import { useState, useRef, useEffect } from 'react'
import { X, Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Download, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

const VideoViewer = ({ video, isOpen, onClose }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [quality, setQuality] = useState('auto')

  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          seek(currentTime - 10)
          break
        case 'ArrowRight':
          seek(currentTime + 10)
          break
        case 'ArrowUp':
          e.preventDefault()
          setVolume(prev => Math.min(prev + 0.1, 1))
          break
        case 'ArrowDown':
          e.preventDefault()
          setVolume(prev => Math.max(prev - 0.1, 0))
          break
        case 'm':
          toggleMute()
          break
        case 'f':
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, currentTime])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [isOpen])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.volume = volume
      video.muted = isMuted
      video.playbackRate = playbackRate
    }
  }, [volume, isMuted, playbackRate])

  const togglePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const seek = (time) => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.max(0, Math.min(time, duration))
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleDownload = () => {
    if (video.downloadUrl) {
      const link = document.createElement('a')
      link.href = video.downloadUrl
      link.download = video.filename || 'video.mp4'
      link.click()
    }
  }

  if (!isOpen || !video) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Video */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={video.url}
          className="max-w-full max-h-full"
          poster={video.thumbnail}
          preload="metadata"
        />

        {/* Play button overlay */}
        {!isPlaying && (
          <Button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          >
            <Play size={32} className="text-white ml-1" />
          </Button>
        )}
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Progress bar */}
        <div className="mb-4">
          <div className="relative h-1 bg-white/30 rounded-full cursor-pointer">
            <div
              className="absolute h-full bg-white rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => seek(currentTime - 10)}
              className="text-white hover:bg-white/20"
            >
              <SkipBack size={20} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => seek(currentTime + 10)}
              className="text-white hover:bg-white/20"
            >
              <SkipForward size={20} />
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20"
              />
            </div>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20"
              >
                <Settings size={20} />
              </Button>

              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-3 min-w-48">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Vitesse</label>
                      <select
                        value={playbackRate}
                        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                        className="w-full bg-white/20 text-white rounded px-2 py-1 text-sm"
                      >
                        <option value={0.25}>0.25x</option>
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>Normal</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Qualité</label>
                      <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full bg-white/20 text-white rounded px-2 py-1 text-sm"
                      >
                        <option value="auto">Auto</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {video.downloadUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-white hover:bg-white/20"
              >
                <Download size={20} />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize2 size={20} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-white">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          {video.description && (
            <p className="text-sm text-gray-300 mt-1">{video.description}</p>
          )}
          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
            {video.software && <span>Logiciel: {video.software}</span>}
            {video.duration && <span>Durée: {video.duration}</span>}
            {video.year && <span>Année: {video.year}</span>}
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts help */}
      <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded text-xs opacity-50 hover:opacity-100 transition-opacity">
        <div className="space-y-1">
          <p><strong>Raccourcis:</strong></p>
          <p>Espace: Play/Pause</p>
          <p>←/→: -10s/+10s</p>
          <p>↑/↓: Volume</p>
          <p>M: Muet</p>
          <p>F: Plein écran</p>
        </div>
      </div>
    </div>
  )
}

export default VideoViewer

