import React from 'react'
import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"

import { createActiveCard } from "./app/activeCardSlice"
import { updateCards } from "./app/cardsSlice"

function BingoCards() {
  const cards = useSelector(({ cards }) => cards)
  const dispatch = useDispatch()

  let modal
  React.useEffect(() => {
    modal = new window.bootstrap.Modal(document.getElementById('modal'), {})
  }, [])

  return <div className="bingo-card-container">
    {cards.map(card => <div
      data-bs-toggle="tooltop"
      date-bs-placement="top"
      title={card.challenge}
      className={classNames("bingo-card", { complete: card.title && card.started && card.finished, watching: card.title && card.started && !card.finished, highlight: card.highlight })}
    >
      <div
        className={classNames("bingo-card-foreground")}
        onClick={() => {
          dispatch(updateCards({ position: card.position, highlight: false }))
          dispatch(createActiveCard(card.position))
          modal.show()
        }}
      />
      {card.imgUrl && <img src={card.imgUrl} />}
      <span className={card.title && 'filled'}>{card.position}</span>
    </div>
    )}
  </div>
}

export default BingoCards