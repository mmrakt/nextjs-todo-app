import React from 'react'

type IProps = {
  isCompleted: boolean
  onClick: () => void
}

function Row({ isCompleted, onClick }: IProps): any {
  const divStyles =
    'rounded-[50%] border-neutral-300 border-[1px] border-solid active:animate-ping active:animation-delay-500'
  const svgStyles = 'w-6 h-6'
  return (
    <>
      {isCompleted ? (
        <button
          type="button"
          onClick={() => {
            onClick()
          }}
        >
          <div className={`${divStyles} bg-neutral-600`}>
            <svg className={svgStyles} xmlns="http://www.w3.org/2000/svg">
              <path
                className="stroke-slate-300 stroke-1"
                d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
              />
            </svg>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            onClick()
          }}
        >
          <div className={`${divStyles} bg-dark-850`}>
            <svg className={svgStyles} xmlns="http://www.w3.org/2000/svg">
              <path d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z" />
            </svg>
          </div>
        </button>
      )}
    </>
  )
}

export default Row
