import React from 'react'
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = ''
}) => {
  return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition-all overflow-hidden flex items-start">
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : null}
      <div>
        <div className="flex items-center mb-1">
          {displayName ? (
            <p className="mr-2 text-primary-500">{displayName}</p>
          ) : null}
          {createdAt?.seconds ? (
            <span className="text-gray-500 text-xs">
              {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
            </span>
          ) : null}
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Message