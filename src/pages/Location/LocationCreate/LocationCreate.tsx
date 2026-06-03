import React, {
  useEffect,
  // useState 
} from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import MiniMap from '@/components/MiniMap/MiniMap';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface IProps {
  isEdit?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}
// interface Position {
//   lat: number;
//   lng: number;
// }
// // Thiết lập kích thước bản đồ
// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// // Tọa độ trung tâm mặc định (ví dụ: Quận Bình Thạnh, TP.HCM)
// const center: Position = {
//   lat: 10.8033,
//   lng: 106.7115
// };
const LocationCreate: React.FC<IProps> = ({ isEdit = false, open, setOpen = () => { } }: IProps) => {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "YOUR_GOOGLE_MAP_API_KEY" // Thay bằng API Key của bạn
  // });
  // const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);


  useEffect(() => {
    console.log("Mounted")
    return () => {
      console.log("Unmounted")
    }
  }, [])

  const onClose = () => {
    setOpen(false);
  };
  // const handleMapClick = (event: google.maps.MapMouseEvent) => {
  //   if (event.latLng) {
  //     setSelectedPosition({
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     });
  //   }
  // };
  return (
    <>
      <Drawer
        title={`${!isEdit ? "Tạo" : "Cập nhật"} địa điểm`}
        closable={{ placement: 'end' }}
        size={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
            transform: 'translate(0, 0)'
          },
        }}
        footer={
          <Space className="w-full flex-row justify-end">
            <Button onClick={onClose} type="primary">
              Lưu
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </Space>
        }
        loading={false}
      >
        <Form layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="locationName"
                label="Tên địa điểm"
                rules={[{ required: true, message: 'Vui lòng nhập tên địa điểm' }]}
              >
                <Input placeholder="Vui lòng nhập tên địa điểm" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="position"
                label="Vị trí"
                rules={[{ required: true, message: 'Vui lòng chọn vị trí' }]}
              >
                <MiniMap />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="parentId"
                label="Thuộc địa điểm (Tỉnh, thành phố)"
                rules={[{ required: true, message: 'Vui lòng chọn địa điểm thuộc về' }]}
              >
                <Select
                  placeholder="Vui lòng chọn địa điểm"
                  options={[
                    { label: 'Jack Ma', value: 'jack' },
                    { label: 'Tom Liu', value: 'tom' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tag"
                label="Tag địa điểm"
                rules={[{ required: true, message: 'Vui lòng chọn tag' }]}
              >
                <Input placeholder="Ví dụ #Saigon, #Hanoi" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="photo"
                label="Hình ảnh"
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh' }]}
              >
                <Select
                  placeholder="Vui lòng chọn hình ảnh"
                  options={[
                    { label: 'Xiaoxiao Fu', value: 'xiao' },
                    { label: 'Maomao Zhou', value: 'mao' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default LocationCreate;