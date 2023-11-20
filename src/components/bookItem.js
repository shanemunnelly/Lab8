import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'

function BookItem(props) {

    return (
        <div>
            <Card>
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img src={props.myBook.cover}></img>
                        <footer>
                            {props.myBook.author
                            
                            }
                        </footer>
                    </blockquote>
                </Card.Body>
                <Link to={"/edit/"+ props.myBook._id} className='btn-primary'> Edit </Link>
            </Card>
            {/* <h3>{props.myBook.title}</h3>
            <img src={props.myBook.thumbnailUrl}></img>
            <p>{props.myBook.authors[0]}</p> */}
        </div>
    );

}

export default BookItem;