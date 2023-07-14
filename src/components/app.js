import React, { useState } from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    const boardCopy = [...board];
    if (calculateWinner(boardCopy) || boardCopy[index]) {
      return;
    }
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(boardCopy);
    if (gameWinner) {
      setWinner(gameWinner);
      setShowModal(true);
    }
  };

  const renderSquare = (index) => {
    return (
      <Button
        variant="outline-primary"
        className="square m-1"
        onClick={() => handleClick(index)}>
        {board[index]}
      </Button>
    );
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setShowModal(false);
  };

  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <Container className="text-center">
      <h1 className="mt-5">Tic Tac Toe</h1>
      <div className="status mt-4">{status}</div>
      <div className="board mt-4">
        <Row className="justify-content-center">
          <Col xs="auto">{renderSquare(0)}</Col>
          <Col xs="auto" className="p-0">
            <div className="vertical-line"></div>
          </Col>
          <Col xs="auto">{renderSquare(1)}</Col>
          <Col xs="auto" className="p-0">
            <div className="vertical-line"></div>
          </Col>
          <Col xs="auto">{renderSquare(2)}</Col>
        </Row>
        <div className="horizontal-line"></div>
        <Row className="justify-content-center">
          <Col xs="auto">{renderSquare(3)}</Col>
          <Col xs="auto" className="p-0">
            <div className="vertical-line"></div>
          </Col>
          <Col xs="auto">{renderSquare(4)}</Col>
          <Col xs="auto" className="p-0">
            <div className="vertical-line"></div>
          </Col>
          <Col xs="auto">{renderSquare(5)}</Col>
        </Row>
        <div className="horizontal-line"></div>
        <Row className="justify-content-center">
          <Col xs="auto">{renderSquare(6)}</Col>
          <Col xs="auto" className="p-0">
            <div className="vertical-line"></div>
          </Col>
          <Col xs="auto">{renderSquare(7)}</Col>
          <Col xs="auto" className="p-0">
            <div className="vertical-line"></div>
          </Col>
          <Col xs="auto">{renderSquare(8)}</Col>
        </Row>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>{winner ? `Winner: ${winner}` : "It's a draw!"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRestart}>
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
