import styled from 'styled-components';

export const DataCardWrapper = styled.div`
  padding: 20px;
  .integration-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .upload-section {
    margin-top: 20px;
  }
`;

export const IntegrationCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: calc(33.333% - 20px); /* Ajusta el ancho para que quepan 3 tarjetas por fila */
  text-align: center;
  box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho total */
  img {
    width: 100px;
    height: 100px;
  }
  .details {
    margin-top: 10px;
  }
  .actions {
    margin-top: 10px;
  }
`;

export const IntegrationButton = styled.button`
  background: ${(props) => (props.variant === 'read' ? '#007bff' : '#6c757d')};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.variant === 'read' ? '#0056b3' : '#5a6268')};
  }
`;

export const UploadSection = styled.div`
  margin-top: 20px;
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const RemoveButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: #c82333;
  }
`;

export const AddButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #218838;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;