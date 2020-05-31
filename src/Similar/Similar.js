/* Uses API results to display list of artists in
content portion of page */

import React, {Component} from 'react'
import SimilarList from './SimilarList'
import config from '../config'

class Similar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            artistName: '',
            artistData: [],
            redirect: false
        }
    }

    componentDidMount() {
        var artistName = this.returnArtistName()
        //console.log(this.returnArtistName())
        //console.log(artistName)
        this.fetchSimilarArtists(artistName)
    }

    /*API Call for searched artist*/
    fetchSimilarArtists(artistName) {
        //const artist = 'Madonna'
        const similarUrl = `${config.API_ENDPOINT}/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=e93fe007a5029bc2d532588847d728b4&format=json`

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

    render() {
        return (
            <div>
                <SimilarList data={this.state.artistData} />
            </div>
        )
    }
}

export default Similar
