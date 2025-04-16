import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRoomContext } from '../../context/RoomContext'
import { toast } from 'sonner'

const Meet = () => {
  const [roomId, setRoomId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { setUserDetails } = useRoomContext()
  const navigate = useNavigate()

  const handleJoin = () => {
    if (roomId && name && email) {
      setUserDetails({ roomId, name, email })
      console.log(`Joining room: ${roomId}, Name: ${name}, Email: ${email}`);
      
      navigate(`/meet/${roomId}`)
    } else {
      toast.error('Please fill all fields')
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-800 to-green-600">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
      <h1 className='text-xl text-center text-white'>The Room Id is: <span className='underline font-semibold'>KSX3DE22</span></h1>
        <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-white'>
          Join a Meeting
        </h2>
        <input
        type='text'
        placeholder='Enter Room Id'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
        />
         <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
          <button
          onClick={handleJoin}
          className="w-full bg-gradient-to-r from-green-500 to-cyan-400 text-black py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
        >
          Join Room
        </button>
      </div>
    </div>
  )
}

export default Meet
