import { UpdateConfig } from 'actions/configActions.js';
import axios from 'axios';
import { TOAST_OPTIONS } from 'constants/configConstants';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddConfig = (props) => {
    const { productId, close } = props;

    const dispatch = useDispatch();
    const [cpu, setCpu] = useState({});
    const [ram, setRam] = useState({});
    const [screen, setScreen] = useState({});

    useEffect(() => {
        if (productId) {
            const fetchConfig = async () => {
                const config = await axios.get(`/api/config/${productId}`)
                const data = config.data[0] || null;

                if (data) {
                    setCpu({
                        version: data.CPU.version,
                        cpuTech: data.CPU.cpuTech,
                        cpuType: data.CPU.cpuType,
                        cpuSpeed: data.CPU.cpuSpeed,
                        busSpeed: data.CPU.busSpeed,
                    });
                    setRam({
                        ramCapacity: data.RAM.ramCapacity,
                        ramType: data.RAM.ramType,
                        ramSpeed: data.RAM.ramSpeed,
                        ramSlot: data.RAM.ramSlot,
                        ramMax: data.RAM.ramMax,
                    });
                    setScreen({
                        screenSize: data.Screen.screenSize,
                        screenType: data.Screen.screenType,
                        resolution: data.Screen.resolution,
                        sweepFrequency: data.Screen.sweepFrequency,
                        bgPanels: data.Screen.bgPanels,
                        screenTech: data.Screen.screenTech,
                    })
                }
            }
            fetchConfig();
        }
    }, [productId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(UpdateConfig({
            productId: productId,
            CPU: cpu,
            RAM: ram,
            Screen: screen,
        }));
        close(false);
        toast.success("Đã cập nhật thông tin", {
            ...TOAST_OPTIONS,
        })

    }

    return (
        <div className="modal">
            <div className="modal__wrapper">
                <div className="modal__box">
                    <form className="config-body" onSubmit={submitHandler}>
                        <span className="modal-close" onClick={() => close(false)}>
                            <i className="far fa-times-circle"></i>
                        </span>
                        <div className="items-title">
                            <h1>Bộ xử lý - CPU</h1>
                        </div>
                        <div className="items">
                            <div className="config-item">
                                <label htmlFor="version">Phiên bản</label>
                                <input id="version" onChange={(e) => setCpu({ ...cpu, version: e.target.value })} placeholder="Phiên bản" type="text" defaultValue={cpu?.version} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="cpuTech">Công nghệ CPU</label>
                                <input id="cpuTech" onChange={(e) => setCpu({ ...cpu, cpuTech: e.target.value })} placeholder="Công nghệ CPU" type="text" defaultValue={cpu?.cpuTech} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="cpuType">Loại CPU</label>
                                <input id="cpuType" onChange={(e) => setCpu({ ...cpu, cpuType: e.target.value })} placeholder="Loại CPU" type="text" defaultValue={cpu?.cpuType} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="cpuSpeed">Tốc độ CPU</label>
                                <input id="cpuSpeed" onChange={(e) => setCpu({ ...cpu, cpuSpeed: e.target.value })} placeholder="Tốc độ CPU" type="text" defaultValue={cpu?.cpuSpeed} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="busSpeed">Tốc độ BUS</label>
                                <input id="busSpeed" onChange={(e) => setCpu({ ...cpu, busSpeed: e.target.value })} placeholder="Tốc độ BUS" type="text" defaultValue={cpu?.busSpeed} required />
                            </div>

                        </div>


                        <div className="items-title">
                            <h1>RAM</h1>
                        </div>
                        <div className="items">
                            <div className="config-item">
                                <label htmlFor="ramCapacity">Dung lượng RAM</label>
                                <input id="ramCapacity" onChange={(e) => setRam({ ...ram, ramCapacity: e.target.value })} placeholder="Dung lượng RAM" type="text" defaultValue={ram?.ramCapacity} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="ramType">Loại RAM</label>
                                <input id="ramType" onChange={(e) => setRam({ ...ram, ramType: e.target.value })} placeholder="Loại RAM" type="text" defaultValue={ram?.ramType} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="ramSpeed">Tốc độ RAM</label>
                                <input id="ramSpeed" onChange={(e) => setRam({ ...ram, ramSpeed: e.target.value })} placeholder="Tốc độ RAM" type="text" defaultValue={ram?.ramSpeed} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="ramSlot">Số khe cắm rời</label>
                                <input id="ramSlot" onChange={(e) => setRam({ ...ram, ramSlot: e.target.value })} placeholder="Số khe cắm rời" type="text" defaultValue={ram?.ramSlot} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="ramMax">Hỗ trợ RAM tối đa</label>
                                <input id="ramMax" onChange={(e) => setRam({ ...ram, ramMax: e.target.value })} placeholder="Hỗ trợ RAM tối đa" type="text" defaultValue={ram?.ramMax} required />
                            </div>

                        </div>

                        <div className="items-title">
                            <h1>Màn Hình</h1>
                        </div>
                        <div className="items">
                            <div className="config-item">
                                <label htmlFor="screenSize">Kích thước màn hình</label>
                                <input id="screenSize" onChange={(e) => setScreen({ ...screen, screenSize: e.target.value })} placeholder="Kích thước màn hình" type="text" defaultValue={screen?.screenSize} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="screenType">Loại màn hình</label>
                                <input id="screenType" onChange={(e) => setScreen({ ...screen, screenType: e.target.value })} placeholder="Loại màn hình" type="text" defaultValue={screen?.screenType} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="resolution">Độ phân giải</label>
                                <input id="resolution" onChange={(e) => setScreen({ ...screen, resolution: e.target.value })} placeholder="Độ phân giải" type="text" defaultValue={screen?.resolution} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="sweepFrequency">Tần số quét</label>
                                <input id="sweepFrequency" onChange={(e) => setScreen({ ...screen, sweepFrequency: e.target.value })} placeholder="Tần số quét" type="text" defaultValue={screen?.sweepFrequency} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="bgPanels">Tấm nền</label>
                                <input id="bgPanels" onChange={(e) => setScreen({ ...screen, bgPanels: e.target.value })} placeholder="Tấm nền" type="text" defaultValue={screen?.bgPanels} required />
                            </div>

                            <div className="config-item">
                                <label htmlFor="screenTech">Công nghệ màn hình</label>
                                <input id="screenTech" onChange={(e) => setScreen({ ...screen, screenTech: e.target.value })} placeholder="Công nghệ màn hình" type="text" defaultValue={screen?.screenTech} required />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="btn-conf-update"
                        >
                            <i className="fas fa-level-up-alt"></i> Cập nhật
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddConfig;