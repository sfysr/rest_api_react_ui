import React, { Component } from "react";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { FaRegPenToSquare,FaTrash,FaRegSquarePlus } from "react-icons/fa6";

class DataItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        label: "",
        key: "",
        value: "",
        description:"",
      },
      idToEdit: null, // Güncellenecek verinin id'si
      idToDelete:null, // Silinecek verinin id'si
      showAddModal: false, // Ekleme modalını gösterme durumu
      showEditModal: false, // Düzenleme modalını gösterme durumu
      showDeleteModal: false, //Silme modalını gösterme durumu
      dataItems: [], // Veri listesi
      editedItem: null, // Düzenlenen veri
    };
  }

  componentDidMount() {
    // Verileri yükleyin
    this.loadData();
  }

  loadData() {
    DataService.getAll()
      .then((response) => {
        this.setState({
          dataItems: response.data,
        });
      })
      .catch((error) => {
        console.error("Veri alınırken hata:", error);
      });
  }

  handleCreate = () => {
    const { formData } = this.state;
    if (!formData.label || !formData.key || !formData.value || !formData.description) {
      toast.error("Eklenecek veri için tüm alanları doldurmalısınız.");
      return;
    }
    DataService.create(formData)
      .then(() => {
        toast.success("Veri başarıyla eklendi.");
        this.loadData();
        this.setState({
          formData: {
            label: "",
            key: "",
            value: "",
            description: "",
          },
          showAddModal: false,
        });
      })
      .catch((error) => {
        console.error("Veri eklenirken hata:", error);
      });
  };

  handleUpdate = () => {
    const { formData, idToEdit } = this.state;
    if (!formData.label || !formData.key || !formData.value || !formData.description) {
      toast.error("Güncellenecek veri için tüm alanları doldurmalısınız.");
      return;
    }
    if (idToEdit) {
      DataService.update(idToEdit, formData)
        .then(() => {
          toast.success("Veri başarıyla güncellendi.");
          this.loadData();
          this.setState({
            formData: {
              label: "",
              key: "",
              value: "",
              description: "",
            },
            idToEdit: null,
            showEditModal: false,
          });
        })
        .catch((error) => {
          console.error("Veri güncellenirken hata:", error);
        });
    } else {
      console.error("Güncellenecek verinin id'si belirtilmedi.");
    }
  };

  handleConfirmDelete = () => {
    const { idToDelete } = this.state;
  
    if (idToDelete) {
      DataService.delete(idToDelete)
        .then(() => {
          toast.success("Veri başarıyla silindi.");
          this.loadData(); // Verileri yeniden yükleme
          this.setState({
            showDeleteModal: false,
            idToDelete: null,
          });
        })
        .catch((error) => {
          console.error("Veri silinirken hata:", error);
          toast.error("Veri silinirken hata oluştu.");
        });
    } else {
      toast.error("Silinecek verinin ID'si belirtilmedi.");
      console.error("Silinecek verinin ID'si belirtilmedi.");
    }
  };
  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleDeleteClick = (item) => {
    this.setState({
      showDeleteModal: true,
      idToDelete: item._id, // Silinecek verinin ID'sini saklayabilirsiniz
    });
  };
  

  handleEditClick = (item) => {
    this.setState({
      showEditModal: true,
      formData: {
        label: item.label,
        key: item.key,
        value: item.value,
        description: item.description,
      },
      idToEdit: item._id,
    });
  };

  render() {
    const {
      formData,
      showAddModal,
      showEditModal,
      showDeleteModal,
      dataItems,
    } = this.state;

    return (
      <div style={{backgroundColor:"black"}}>
        <h3 style={{color:"white"}}>Veri Tablosu</h3>
        <Button
          variant="dark"
          style={{position:"absolute",right:0,top:58}}
          onClick={() => this.setState({ showAddModal: true })}
        >
          Ekle <FaRegSquarePlus />
        </Button>
        <Modal
          show={showAddModal}
          onHide={() => this.setState({ showAddModal: false })}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Veri Ekle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleCreate}>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={this.handleChange}
                placeholder="Alan"
                required
              />
              <input
                type="text"
                name="key"
                value={formData.key}
                onChange={this.handleChange}
                placeholder="Çevre"
                required
              />
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={this.handleChange}
                placeholder="Değer"
                required
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={this.handleChange}
                placeholder="Açıklama"
                required
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleCreate}>
              Ekle
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showAddModal: false })}
            >
              İptal
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover variant="dark">
          <thead style={{ color: "black" }}>
            <tr>
              <th>ALAN</th>
              <th>ÇEVRE</th>
              <th>DEĞER</th>
              <th>AÇIKLAMA</th>
              <th>SON GÜNCELLEME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataItems.map((item) => (
              <tr key={item._id}>
                <td headers="ALAN">{item.label}</td>
                <td headers="ÇEVRE">{item.key}</td>
                <td headers="DEĞER">{item.value}</td>
                <td headers="AÇIKLAMA">{item.description}</td>
                <td headers="SON GÜNCELLEME">{item.lastUpdate}</td>
                <td>
                  <Button variant = "light"
                  onClick={() => this.handleEditClick(item)}>
                     Düzenle <FaRegPenToSquare />
                  </Button>
                  <Button variant= "danger"
                  style={{"marginLeft":5}}
                  onClick={() => this.handleDeleteClick(item)}>
                    Sil <FaTrash />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={showDeleteModal}
          onHide={() => this.setState({ showDeleteModal: false })}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Silme Onayı</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Veriyi silmek istediğinize emin misiniz?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleConfirmDelete}>
              Evet
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showDeleteModal: false })}
            >
              İptal
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEditModal}
          onHide={() => this.setState({ showEditModal: false })}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Veri Düzenle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleUpdate}>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={this.handleChange}
                placeholder="Alan"
                required
              />
              <input
                type="text"
                name="key"
                value={formData.key}
                onChange={this.handleChange}
                placeholder="Çevre"
                required
              />
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={this.handleChange}
                placeholder="Değer"
                required
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={this.handleChange}
                placeholder="Açıklama"
                required
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleUpdate}>
              Güncelle
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showEditModal: false })}
            >
              İptal
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}

export default DataItemForm;
