import React, {
  useEffect,
  // useState 
} from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
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
const LocationBlogCreate: React.FC<IProps> = ({ isEdit = false, open, setOpen = () => { } }: IProps) => {
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
        title={`${!isEdit ? "Tạo" : "Cập nhật"} bài viết`}
        closable={{ placement: 'end' }}
        size={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
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
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input placeholder="Vui lòng nhập tiêu đề" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Vui lòng nhập nội dung" />
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
                <Select
                  placeholder="Vui lòng chọn vị trí"
                  options={[
                    { label: 'Xiaoxiao Fu', value: 'xiao' },
                    { label: 'Maomao Zhou', value: 'mao' },
                  ]}
                />
              </Form.Item>
            </Col>
            {/* <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onClick={handleMapClick}
      >

        {selectedPosition && (
          <Marker position={selectedPosition} />
        )}
      </GoogleMap>

      {selectedPosition && (
        <div style={{ marginTop: '10px' }}>
          <b>Vị trí đã chọn:</b> 
          Vĩ độ: {selectedPosition.lat.toFixed(6)}, Kinh độ: {selectedPosition.lng.toFixed(6)}
        </div>
      )}
    </div> */}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="road"
                label="Đường đi"
                rules={[{ required: true, message: 'Vui lòng chọn đường' }]}
              >
                <Input placeholder="Mô tả đường đi" />
              </Form.Item>
            </Col></Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startingId"
                label="Xuất phát"
                rules={[{ required: true, message: 'Vui lòng chọn điểm xuất phát' }]}
              >
                <Select
                  placeholder="Vui lòng chọn điểm xuất phát"
                  options={[
                    { label: 'Jack Ma', value: 'jack' },
                    { label: 'Tom Liu', value: 'tom' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="destinationId"
                label="Điểm đến"
                rules={[{ required: true, message: 'Vui lòng chọn điểm đến' }]}
              >
                <Select
                  placeholder="Vui lòng chọn điểm đến"
                  options={[
                    { label: 'Jack Ma', value: 'jack' },
                    { label: 'Tom Liu', value: 'tom' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="tags"
                label="Tags (Khu vực đã đi qua)"
                rules={[{ required: true, message: 'Vui lòng chọn những khu vực đã đi qua' }]}
              >
                <Select
                  placeholder="Vui lòng chọn những khu vực đã đi qua"
                  options={[
                    { label: 'Xiaoxiao Fu', value: 'xiao' },
                    { label: 'Maomao Zhou', value: 'mao' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              >
                <Select
                  placeholder="Vui lòng chọn trạng thái"
                  options={[
                    { label: 'Xiaoxiao Fu', value: 'xiao' },
                    { label: 'Maomao Zhou', value: 'mao' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="photos"
                label="Hình ảnh, video"
                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
              >
                <Select
                  placeholder="Vui lòng chọn ảnh"
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

export default LocationBlogCreate;