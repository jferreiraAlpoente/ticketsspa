import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';


type Props = {
  onFilterChange: (filter: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
};



export function ThreadControls({ onFilterChange, onStatusChange, onSortChange }: Props) {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange(event.target.value);
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  onStatusChange(event.target.value);
}

const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  onSortChange(event.target.value);
}


  return (
    <Row className="mb-3 mx-2">
      <Col>
        <Form.Control 
          type="text"
          placeholder="Pesquisar:"
          onChange={handleFilterChange}
        />
      </Col>
      <Col>
        <Form.Select onChange={handleStatusChange}>
          <option value="">Todos</option>
          <option value="A">Abertos</option>
          <option value="F">Fechados</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Select onChange={handleSortChange}>
          <option value="mostRecent">Mais recente</option>
          <option value="leastRecent">Mais antigo</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
