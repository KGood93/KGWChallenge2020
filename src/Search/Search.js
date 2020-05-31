/*Search Input Field*/

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: {
                value: '',
                touched: false
            },
            artistData: [],
            redirect: false
        }
    }

    /*Updates state to reflect artists name*/
    updateArtist(artistName) {
        this.setState({artist: {value: artistName, touched: true}})
    }

    updateRedirect() {
        this.setState({redirect: true})
    }

    
    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state.artist.value)
        //this.fetchSimilarArtists()

        this.updateRedirect()
    }

    /*API Call for searched artist*/
    fetchSimilarArtists() {
        const artist = this.state.artist.value
        const similarUrl = `${config.API_ENDPOINT}/2.0/?method=artist.getsimilar&artist=${artist}&api_key=e93fe007a5029bc2d532588847d728b4&format=json`

        fetch(similarUrl)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                else {
                    throw new Error('Something went wrong loading artists')
                }
            })
            .then(data => {
                this.setState({artistData: data.similarartists.artist})
                console.log(this.state.artistData)
            })
            .then(
                this.setState({redirect: true})
            )
    }

    /*Alerts that artist is a required field*/
    validateArtist() {
        const name = this.state.artist.value.trim();
        if (name.length === 0) {
            return "Artist Name Is Required"
        }
    }

    render() {
        const artistError = this.validateArtist();

        return (
            <section>
                <form className="Search" onSubmit={this.handleSubmit}>
                    <label htmlFor="Artist Search" className="ArtistLable">
                        Artist: 
                    </label>
                    <input 
                        type="text"
                        className="artistSearch"
                        onChange={e=> this.updateArtist(e.target.value)}
                    />
                    {this.state.artist.touched && <ValidationError message={artistError} />}
                    <button
                        type="submit"
                        disabled={this.validateArtist()}
                        className="submitButton"
                    >
                        Submit
                    </button>
                </form>
                {this.state.redirect && <Redirect to={`/similar/${this.state.artist.value}`}/>}
            </section>
        )
    }
}

export default Search