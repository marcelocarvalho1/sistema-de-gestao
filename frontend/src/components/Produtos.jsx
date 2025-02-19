import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form } from 'react-bootstrap';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', estoque: '' });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const response = await axios.get('http://localhost:5000/produtos');
    setProdutos(response.data);
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/produtos', novoProduto);
    setNovoProduto({ nome: '', preco: '', estoque: '' });
    carregarProdutos();
  };

  return (
    <Container className="mt-4">
      <h2>Gerenciamento de Produtos</h2>
      <Form onSubmit={adicionarProduto} className="mb-4">
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Estoque</Form.Label>
          <Form.Control
            type="number"
            value={novoProduto.estoque}
            onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">Adicionar Produto</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.estoque}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Produtos;
