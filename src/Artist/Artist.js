/* Displays information about an artist chosen from
the similar artist page*/

import React, {Component} from 'react'
import config from '../config'

class Artist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artistName: '',
            artistBio: ''
        }
    }

    componentDidMount() {
        this.getArtistInfo()
    }

    returnArtistName() {
        //console.log(this.props)
        var artistSelected = this.props.location.pathname
        //console.log(artistSelected)
        var split = artistSelected.split("/")
        //console.log(split)
        var workingName = split[2]
        //console.log(workingName)
        return workingName
    }

    getArtistInfo() {
        var artistName = this.returnArtistName()

        var artistUrl = `${config.API_ENDPOINT}/2.0/?method=artist.getinfo&artist=${artistName}&api_key=e93fe007a5029bc2d532588847d728b4&format=json`
    
        fetch(artistUrl)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                else {
                    throw new Error('Something went wrong loading artist information')
                }
            })
            .then(data => {
                this.setState({artistName: data.artist.name, artistBio: data.artist.bio.content})
            })
    }

    render() {
        return (
            <div>
                <h2>{this.state.artistName}</h2>
                <p>{this.state.artistBio}</p>
            </div>
        )
    }
}

export default Artist