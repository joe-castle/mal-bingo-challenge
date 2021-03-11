import classNames from "classnames"

const englishMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatMalDate(date) {
  const parsedDate = new Date(date)

  return `${englishMonth[parsedDate.getMonth()]} ${parsedDate.getDate()}`
}

export function padNum(num) {
  return num < 10 ? `0${num}` : `${num}`
}

export const throttle = (function () {
  let timer = null;

  return (time, fn) => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      timer = null
      fn()
    }, time)
  }
})()

export function clearCard(card) {
  return {
    ...card,
    title: '',
    id: '',
    imgUrl: '',
    started: '',
    finished: '',
    details: card.details ? Object.keys(card.details).reduce((prev, curr) => ({ ...prev, [curr]: '' }), {}) : null
  }
}

export function cardState(card, complete, watching, notStarted) {
  return classNames({
    [complete]: card.started && card.finished,
    [watching]: card.started && !card.finished,
    [notStarted]: !card.started && !card.finished
  })
}

export function createBbCode(card) {
  return `[*]${cardState(card, '[b]', '[b][i]', '')}[color=${cardState(card, 'SEAGREEN', 'MEDIUMPURPLE', 'SLATEGRAY')}][Started: ${card.started ? formatMalDate(card.started) : 'DATE'}] [Finished: ${card.finished ? formatMalDate(card.finished) : 'DATE'}][/color] (${padNum(card.position)}) ${card.challengeLinks ? replaceUrls(card, false) : card.challenge}
[url=http://myanimelist.net/anime/${card.id ? card.id : '0000'}]${card.title ? card.title : 'ANIME_TITLE'}[/url]${!card.details ? cardState(card, '[/b]', '[/i][/b]', '') : ''}${card.details ? `\n[color=LIGHTSEAGREEN][${Object.keys(card.details).reduce((prev, curr) => [...prev, `${curr}: ${card.details[curr]}`], []).join(' | ')}][/color]` : ''}${card.details ? cardState(card, '[/b]', '[/i][/b]', '') : ''}`
}

export function replaceUrls(card, isHtml = true) {
  return Object
    .keys(card.challengeLinks)
    .reduce((prev, link) => prev.replace(link, isHtml ? `<a target="_blank" href="${card.challengeLinks[link]}">${link}</a>` : `[url=${card.challengeLinks[link]}]${link}[/url]`), card.challenge)
}