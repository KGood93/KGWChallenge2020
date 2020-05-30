/* Uses API results to display list of artists in
content portion of page */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Similar extends Component {

    render() {
        const artistsList = this.props.data
        //console.log(artistsList)
        return(
            artistsList.map((artistDetails, index) => {
                return (
                    <div className="artistEntry" key={index}>
                        <Link to={`/artist/${artistDetails.name}`}>
                            {artistDetails.name}
                        </Link>
                    </div>
                )
            })
        )
    }
}

export default Similar
