const observer = event => {
  event.preventDefault()
  const data = new FormData( event.target )
  const pokemon = data.get( 'pokemon' )

  fetch( `https://pokeapi.co/api/v2/pokemon/${pokemon}` )
    .then( response => {
      return response.json()
    } )
    .then( pokemon => {
      console.log( pokemon )
      const tr = document.createElement( 'tr' )

      const td1 = document.createElement( 'td' )
      td1.innerText = pokemon.id

      const td2 = document.createElement( 'td' )
      td2.innerText = pokemon.name

      const td3 = document.createElement( 'td' )
      td3.innerText = `${pokemon.weight / 10}kg`

      const td4 = document.createElement( 'td' )
      td4.innerText = `${pokemon.height / 10}m`

      const td5 = document.createElement( 'td' )

      const attack = pokemon.stats
        .find( arrayItem => arrayItem.stat.name === 'attack' )

      td5.innerText = attack.base_stat

      const td6 = document.createElement( 'td' )

      const defense = pokemon.stats
        .find( arrayItem => arrayItem.stat.name === 'defense' )

      td6.innerText = defense.base_stat

      tr.append( td1, td2, td3, td4, td5, td6 )

      document.querySelector( '#pokemon-table tbody' ).append( tr )
    } )
    .catch( reason => {
      console.error( reason )
      alert( 'houve um erro' )
    } )
}

module.exports = observer
