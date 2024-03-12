import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const MiApi = ({ searchTerm }) => {
    const [games, setGames] = useState([]);

    const handleReverse = () => {
        // Create a new reversed array and update the state
        const reversedGames = [...games].reverse();
        setGames(reversedGames);
    };  

    useEffect(() => {
        const fetchGameData = async () => {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setGames(data);
        };
            if (searchTerm) {fetchGameData()}
        }
        , [searchTerm]);

  

    return (
        <div className='m-2'>
            <h2>Lista de juegos</h2>
            <Button className="mb-2" variant="info" onClick={handleReverse}> Reordenar </Button>
            {games.length > 0 ? (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Game Title</th>
                            <th>Cheapest Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={game.gameID}>
                                <td>{index + 1}</td>
                                <td>{game.external}</td>
                                <td>${game.cheapest}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No games found</p>
            )}
        </div>
    );
};

export default MiApi;