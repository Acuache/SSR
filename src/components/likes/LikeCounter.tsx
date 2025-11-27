import styles from './LikeCounter.module.css'
import confetti from 'canvas-confetti'
import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
interface Props {
  title: string
}
export const LikeCounter = ({ title }: Props) => {
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeClicks, setLikeClicks] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    const getCurrentLick = async () => {
      const response = await fetch(`/api/posts/likes/${title}`)
      if (!response.ok) return
      const data = await response.json()
      setLikeCount(data.likes)
      setIsLoading(false)
    }
    getCurrentLick()
  }, [])

  useEffect(() => {
    if (!likeClicks) return

    const debouncedSave = debounce(async () => {
      await fetch(`/api/posts/likes/${title}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: likeClicks })
      })
      setLikeClicks(0)
    }, 500)

    debouncedSave()
    return () => debouncedSave.cancel()
  }, [likeClicks])

  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      }
    })
    setLikeCount(prev => prev + 1)
    setLikeClicks(prev => prev + 1)


  }

  if (isLoading) {
    return <span>Cargando botón...</span>
  }


  return (
    <div style={{ "display": "flex", "gap": "10px", "fontSize": "30px" }}>
      <button className={styles.button} onClick={handleClick}>
        {
          likeCount === 0 ? "Da el primer click" : `Clicks: ${likeCount}`
        }
      </button>
      <span>{likeClicks}</span>
    </div>

  )
}
