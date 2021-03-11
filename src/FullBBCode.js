import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createBbCode } from './util'

let pre
let toast

function FullBBCode() {
  const cards = useSelector(({ cards }) => [...cards].sort((a, b) => a.position - b.position))

  useEffect(() => {
    pre = document.getElementById('bbcode')
    toast = new window.bootstrap.Toast(document.getElementById('toast'))
  }, [])

  return <div>
      <div className="input-group">
        <button className="btn btn-success" onClick={() => {
          window.navigator.clipboard.writeText(pre.innerHTML)
          toast.show()
        }}>
          Copy
        </button>
      </div>
    <div className="position-fixed top-5 start-10 p-3" style={{ zIndex: 5 }}>
      <div id="toast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        {/* <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div> */}
        <div className="toast-body">
          Code copied to clipboard
        </div>
        </div>
      </div>
      <pre id="bbcode">
    {`[right][b]Initial Post Number: [/b] #1684 [/right]
🔷 [b]Challenge Start Date:[/b] January 19, 2021
🔶 [b]Challenge Finish Date:[/b] MONTH DAY, YEAR (example: November 30, 2021)

📣 [b]Link to your completed anime list:[/b] https://myanimelist.net/animelist/joecastle?status=2
📣 [b]Link to your Anime+:[/b] http://graph.anime.plus/joecastle/profile

⏰ [b]Completed Anime (at sign-up):[/b] 87
⏰ [b]Time Zone:[/b] UTC/GMT_ZONE

🚩 [b]Card Number:[/b] #06
🚩 [b]Card Level:[/b] Bingo Rookie
🚩 [b]Restriction:[/b] N/A

📚 [b]Anime in Forum Set:[/b] That Time I Got Reincarnated as a Slime Season
📚 [b]Legend:[/b] [color=MEDIUMPURPLE][b]Watching[/b][/color] - [color=SEAGREEN][b]Completed[/b][/color] - [color=SLATEGRAY][b]Inactive/Plan to Watch[/b][/color]

[quote][b][color=#60AFFE]Starting up TO-DO list[/color] (remove list before turning in!)[/b]
[spoiler="TO-DO"][list][*]After posting, refresh the page for your Initial Post Number (upper right corner of your post).
[*]Fill in the header with your information. It can be edited, but check the rules/how to play.

[*]Read the [url=https://myanimelist.net/forum/?topicid=1885985#msg61562925]Rules[/url] section to learn about the challenge guidelines.
[*]Read the [url=https://myanimelist.net/forum/?topicid=1885985#msg61562933]How to Participate[/url] section to learn how to play this version of Bingo.
[*]Read the [url=https://myanimelist.net/forum/?topicid=1885985#msg61562942]Challenge List with Explanations[/url] section for in depth explanations about the challenge item requirements.
[*]If you get stuck check out [url=https://myanimelist.net/forum/?topicid=1869539#msg61609727]Rubik's How-To Guide[/url] for a detailed explanation of how to edit your sign-up post.

[*]Use and keep the provided format for the dates.
[*]Add all extra information required for the items on a separate line underneath the anime title/url.

[*]Before turning-in, remove any items that are not required for your difficulty level.
[*]Update your Challenge Start and Finish Dates on both the Sign-Up and Turn-In posts.

[*]To show that you've read this entire list, please add one of the following symbols to your initial post number (in the top corner of your sign-up post): ♬ ✩ ☩ ღ ° [/list][/spoiler][/quote]
⚔️ [b]Challenge list:[/b]
[quote][list=1][color=#B6A200][center][size=140][b]Card #6: Rubik's Rubric[/b][/size][/center]
[center][spoiler=Card][img]https://i.imgur.com/0VwF8JD.png[/img][/spoiler][/center]

⚔️ [size=90][b]DATE FORMAT:[/b] MMM DD (example: Jan 01)[/size][/color][spoiler=items]
[color=#B6A200][b][size=90]Items (42), (43), (113), and (114) are located at the [u]bottom[/u] of the challenge list[/size][/b][/color]

${cards.filter(card => ![42, 43, 113, 114].includes(card.position)).map(card => `${createBbCode(card)}`).join('\n\n')}

[color=#B6A200][b][Middle Square Items] - see [url=https://myanimelist.net/forum/?topicid=1885985#msg61562933]How to Participate[/url] for rules on how/when to switch.
Please add any switched items in the space below.[/b][/color]

${cards.filter(card => [42, 43, 113, 114].includes(card.position)).map(card => `${createBbCode(card)}`).join('\n\n')}


[/spoiler][/list][/quote]
[center][b][size=95]When posting this form I am confirming that I have read
the [url=https://myanimelist.net/forum/?topicid=1885985#msg61562925]Rules[/url], [url=https://myanimelist.net/forum/?topicid=1885985#msg61562933]How to Participate[/url], and the [url=https://myanimelist.net/forum/?topicid=1885985#msg61562942]Challenge List with Explanations[/url] posts in their entirety to the best of my ability.
I am also confirming that I will not delete my post if I decide later on that I do not wish to complete the challenge.[/size][/b][/center]`}
    </pre>
  </div>
}

export default FullBBCode