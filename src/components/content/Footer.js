import React from 'react';
import Link from '@material-ui/core/Link';
import MajkaPomoc from './MajkaPomoc.pdf';

class Footer extends React.Component {
    render(){
        return(
            <div className="Footer" style={{
                width:'100%',
                height:'75px',
                backgroundColor:'silver',
                display:'flex',
                position:'relative',
                justifyContent:'center',
                alignItems:'center',
                borderStyle: 'ridge',
                borderWidth: '2px 0px 0px 0px',
                boxSizing: 'border-box',
            }}>
                <Link href={MajkaPomoc} target = "_blank" variant="body2">
                    {"Pomoc"}
                </Link>
            </div>
        )
    }
}

export default Footer