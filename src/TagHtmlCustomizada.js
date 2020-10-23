class TagHtmlCustomizada extends HTMLElement {
  constructor() {
    super()
    const itemList = JSON.parse( this.getAttribute( 'list' ) )

    const card = document.createElement( 'div' )
    card.classList.add( 'card' )

    const cardHeader = document.createElement( 'div' )
    cardHeader.classList.add( 'card-header' )

    cardHeader.innerText = this.getAttribute( 'title' )

    const ul = document.createElement( 'ul' )

    ul.classList.add( 'list-group' )
  
    itemList.forEach( item => {
      const li = document.createElement( 'li' )
      li.classList.add( 'list-group-item', 'list-group-flush' )
      li.innerText = item
      ul.append( li )
    } )

    card.append( cardHeader )
    card.append( ul )
    this.append( card )
  }
  connectedCallback() {
    console.log( 'tag customizada inserida no documento' )
  }
}

customElements.define( 'tag-custom', TagHtmlCustomizada )
