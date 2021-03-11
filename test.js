const Mal = require('node-myanimelist').Mal
const pkceChallenge = require('pkce-challenge')

const auth = Mal.auth('f20bea321802e2cfde9d295c51d19d76')

// const pkce = pkceChallenge()
const pkce = { 'code_challenge' : 'DrFaLuRgIBkz6CFEYDCJ4qUwjYLuVhPRON8H3Kt6KqA' }
const url = auth.getOAuthUrl(pkce.code_challenge)

console.log(url)

// auth.Unstable.login('joecastle', 'VzowB7zqrx1z')
auth.authorizeWithCode('def502002db7666f988e11653cf346d5b3dbd13983f0b023d05f0d2bd126f275508f3241191195fa0d60df3760e39875f64f00b31b098229acb0d8bf45ba0df99effedc4eeb5cc6a2d06bc62760608546344929bb37e7e068d615e6b2cb9f75093d5c61f0b27b4e66984d0873978a4b6bfe599e631454b5b7170e8411e800c98884cb758e99598a9ee27907ea2b1652c2c18646fcf0c326ca27e2bcd975583c99921734ec445c333fc7d62abd99a5830a60ad1a62e757a1a97123d971c04da3b4b8635910ca82f9b75a03750a9f059125d3f22480a538f784410e9d85bf1d035b40f32e73d5db9463813c01e84db914e28cdd12420a7fc415860e663ab5a9e3681e8419d4b9bcfb016c0073da9d6adcc2a48438e0ec427958568d8fbb9040e09011a62c4d247296c2f4e0d8bd1253bb386b3f45f82ecd15fb46464c60b27b71be047d62bff6b9fd218e588c357abac8610294dd3e314fbc79f2e0e9c24241692edb1fee9c75cca37fb482c53eadf2ed7816e33dfdb13ed776dfea086b1e2a31432df6bd66314db20237464ebc8120216c261d951', pkce.code_challenge)
  .then(account => {
    account.anime.details(39617, Mal.Anime.fields().all())
      .call()
      .then(res => console.log(res))
  })
  .catch(err => console.log(err))
