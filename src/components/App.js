import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
onFindPetsClick = () => {
  let Url = "/api/pets";

  if (this.state.filters.type !== 'all'){
    Url += `?type=${this.state.filters.type}` 
  }
    fetch(Url)
    .then(res => res.json())
    .then(pets =>this.setState({pets:pets}))
    
}   
    onChangeType = ({target:{value}}) => {
      this.setState({filters:{...this.state.filters, type:value}})
    }
 onAdoptPet = (petsId) => {
   const adoptPet =this.state.pets.map(pet => {
    return pet.id === petsId  ? {...pet, isAdopted:true} : pet
   })
this.setState({pets:adoptPet})
 }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick= {this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
