import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderDirectoryItem({suite}){
    return(
        <Card >
            <Link to={`/directory/${suite.id}`}>
            <CardImg width="100%" src={baseUrl + suite.image} alt={suite.name}/>
            <CardImgOverlay>
                <CardTitle>{suite.name}</CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    );
}

function  Directory(props) {   
  
        const directory = props.suites.suites.map(suite => {
            return (
                <div  key={suite.id } className="col-md-5 m-1">
                   <RenderDirectoryItem suite={suite} />
                </div>
            );
        });
        if (props.suites.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.suites.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.suites.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col"> 
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />

                    </div>

                </div>
                <div className="row">
                    {directory}
                </div>
            </div>
           
        );

}

export default Directory;