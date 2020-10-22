require( '@babel/polyfill' )

require( 'bootstrap/dist/css/bootstrap.css' )

const $ = require( 'jquery' )
require( 'popper.js' )
require( 'bootstrap' )

const ajax = ( method, url, callback ) => {
  const xhr = new XMLHttpRequest()
  xhr.open( method, url )
  const onload = () => {
    if ( xhr.status >= 400 ) {
      return onerror()
    }
    const contentType = xhr.getResponseHeader( 'Content-Type' )

    if ( contentType.includes( 'application/json' ) )
      callback( null, JSON.parse( xhr.responseText ) )

    else callback( null, xhr.responseText )
  }
  const onerror = () => {
    const contentType = xhr.getResponseHeader( 'Content-Type' )

    const objetoErro = new Error( xhr.statusText )
    objetoErro.status = xhr.status

    if ( contentType ) {

      if ( contentType.includes( 'application/json' ) )
        callback( objetoErro, JSON.parse( xhr.responseText ) )

      else callback( objetoErro, xhr.responseText )

    } else {
      callback( objetoErro )
    }
  }
  xhr.onload = onload
  xhr.onerror = onerror
  xhr.send()
}

const ajaxPromise = ( method, url ) =>
  new Promise( ( resolve, reject ) => {
    ajax( method, url, ( err, data ) => {
      if ( err ) reject( err )
      else resolve( data )
    } )
 } );

let emRequisicao = false
window.addEventListener( 'click', () => {
  alert( 'foi clicado na tela' )
} )
window.addEventListener( 'keydown', () => {
  alert( 'uma teclado foi movida para baixo' )
} )
$( '#form-id' ).on( 'submit', event => {
  event.preventDefault()
  if ( emRequisicao ) {
    alert( 'estamos procurando o seu pokemon' )
    return
  }
  emRequisicao = true
  const data = new FormData( event.target )
  const pokemon = data.get( 'pokemon' )

  setTimeout( () => {
    ajaxPromise( 'GET', `https://pokeapi.co/api/v2/pokemon/${pokemon}` )
    .then( data => {
      alert( `
        Nome: ${data.name}
        Peso: ${data.weight}g
        Altura: ${data.height}cm
      ` )
    } )
    .catch( reason => {
      if ( reason.status === 404 )
        alert( `o pokemon com o nome de ${pokemon} não foi encontrado` )
      else {
        alert( `aconteceu um erro, status do error é: ${reason.status}` )
      }
    } )
    .finally( () => {
      emRequisicao = false
    } )
  }, 500 )
} )