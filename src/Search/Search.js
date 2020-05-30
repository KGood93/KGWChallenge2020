/*Search Input Field*/

import React, {Component} from 'react'
import ValidationError from '../ValidationError/ValidationError'
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {
                value: '',
                touched: false
            }
        }
    }

    updateArtist(artistName) {
        this.setState({artist: {value: artistName, touched: true}})
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state.artist.value)
    }

    validateArtist() {
        const name = this.state.artist.value.trim();
        if (name.length === 0) {
            return "Artist Name Is Required"
        }
    }

    render() {
        const artistError = this.validateArtist();

        return (
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
        )
    }
}

export default Search