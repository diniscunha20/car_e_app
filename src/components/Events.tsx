import React from 'react'

const Events: React.FC<{events: string[]}> = ({events}) => {
  return <>
    <div className='mx-auto' >

      <ul className="list bg-base-100 rounded-box shadow-md">

        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Proximos eventos</li>

        {events.map(
          (e) => {
            return (
              <li key={e} className="list-row">
                <div>{e}</div>
                <div>
                  <>Text</>
                </div>
                <button className="btn btn-square btn-ghost"></button>
              </li>
            )
          }
        )}

      </ul>
    </div>
    <div>
      <button className='btn btn-active'>Um botao</button>
      <button className='btn btn-active'>Outro</button>
    </div>
    <div>
      <h1 className='text-error'> para quem quer que leia isto, eu nao percebo um caralho de front end, nem de react, eu genuinamente so nao percebo o que estou a fazer ou como fazer coisas acontecer num ecra, adoro IHC mas react ate e fixe</h1>
    </div>
  </>
}

export default Events