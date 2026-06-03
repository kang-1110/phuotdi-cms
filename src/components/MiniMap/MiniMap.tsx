import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L, { type LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDebounce } from "use-debounce";

// --- FIX LỖI ICON MARKER VỠ HÌNH ---
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useSearchLocation } from '@/api/map.service';
import type { LocationResult } from '@/types/map.type';
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------------------


interface Coordinate {
    lat: number;
    lng: number;
}

// 1. COMPONENT PHỤ TRỢ: Cập nhật kích thước & di chuyển tâm bản đồ
function MapController({ center, zoom, isExpanded }: { center: [number, number]; zoom: number; isExpanded: boolean }): null {
    const map = useMap();

    // Đồng bộ lại kích thước khi khung chứa thay đổi (co giãn lấp đầy cha)
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 300); // Đợi trùng với thời gian hiệu ứng transition CSS
        return () => clearTimeout(timer);
    }, [isExpanded, map]);

    // Đồng bộ vị trí tâm bản đồ khi tìm kiếm
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
}

// 2. COMPONENT PHỤ TRỢ: Lắng nghe click bản đồ
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }): null {
    useMapEvents({
        click(e: LeafletMouseEvent) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

interface MiniMapProps {
    isFullParent?: boolean;
}

// 3. COMPONENT CHÍNH
export default function FullOverlayMap({ isFullParent = false }: MiniMapProps): React.JSX.Element {
    const [isExpanded, setIsExpanded] = useState<boolean>(isFullParent);
    const [center, setCenter] = useState<[number, number]>([10.762622, 106.660172]);
    const [zoom, setZoom] = useState<number>(13);
    const [clickedPosition, setClickedPosition] = useState<Coordinate | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [debouncedSearchText] = useDebounce(searchQuery || "", 500);

    const { data: searchData } = useSearchLocation(debouncedSearchText);
    

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setSearchQuery(event.target.value);
    };

    const handleSelectLocation = (location: LocationResult): void => {
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lon);
        setCenter([lat, lng]);
        setZoom(16);
        setClickedPosition({ lat, lng });
        setSearchQuery(location.display_name);
    };

    return (
        // THẺ BỌC (COMPONENT CHA PHẢI CÓ POSITION RELATIVE)
        <>
            {/* KHUNG CHỨA BẢN ĐỒ ĐIỀU KHIỂN ĐỘNG */}
            <div style={{
                position: `${isExpanded ? 'fixed' : 'relative'}`,
                top: isExpanded ? '0' : 'auto',
                width: `${isExpanded ? 'calc(100% - 48px)' : '100%'}`,
                height: `${isExpanded ? '100%' : '220px'}`,
                zIndex: 99,
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                border: '2px solid #007bff',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
            }}>
                <MapContainer
                    center={center}
                    zoom={zoom}
                    zoomControl={false} // 1. BỎ DẤU + - MẶC ĐỊNH
                    style={{ width: '100%', height: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* 2. THANH TÌM KIẾM NẰM TRONG KHUNG BẢN ĐỒ */}
                    <div
                        style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 1000, width: 'calc(100% - 80px)', maxWidth: '280px' }}
                        onClick={(e) => e.stopPropagation()}     // Chặn click xuyên xuống map tạo Marker mới
                        onMouseDown={(e) => e.stopPropagation()} // Chặn kéo chuột (drag) làm dịch chuyển map phía sau
                    >
                        <input
                            type="text"
                            placeholder="Tìm địa điểm..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '13px' }}
                        />


                        {searchData && searchData.length > 0 && (
                            <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0 0', border: '1px solid #ddd', borderRadius: '4px', maxHeight: '120px', overflowY: 'auto', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                {searchData.map((item) => (
                                    <li
                                        key={item.place_id}
                                        onClick={() => handleSelectLocation(item)}
                                        style={{ padding: '6px 10px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f4f4f4')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        {item.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* 3. NÚT PHÓNG TO/THU NHỎ KHUNG NẰM TRONG KHUNG BẢN ĐỒ */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute', top: '12px', right: '12px', zIndex: 1000,
                            width: '34px', height: '34px', background: '#fff', border: '1px solid #ccc',
                            borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                        }}
                        title={isExpanded ? "Thu nhỏ khung" : "Phóng to khung"}
                    >
                        {isExpanded ? '🗗' : '🗖'}
                    </button>

                    <MapController center={center} zoom={zoom} isExpanded={isExpanded} />
                    <MapClickHandler onMapClick={(lat, lng) => setClickedPosition({ lat, lng })} />

                    {clickedPosition && (
                        <Marker position={[clickedPosition.lat, clickedPosition.lng]}>
                            <Popup>Vị trí đã chọn</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </>
    );
}