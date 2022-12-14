import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useGame from '../hooks/useGame';
const ListCards = () => {
	const { playerOne, playerTwo } = useGame();
	//console.log(playerOne)
	return (
		<Container>
			<Row>
				<Col>
				
					<div className='align-items-center my-2'>
						<h4>Player {playerOne.name}</h4>
						<p>Cards obtained</p>
						{playerOne.cards.map((card, index) => (
							<img
								className='col-sm-1 borderCard'
								key={index}
								src={card.image}
								alt={card.value}
							></img>
						))}
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='align-items-center my-2'>
						<h4>Player {playerTwo.name}</h4>
						<p>Cards obtained</p>
						{playerTwo.cards.map((card, index) => (
							<img
								className='col-sm-1 borderCard'
								key={index}
								src={card.image}
								alt={card.value}
							/>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default ListCards;
