
import Loading from 'app/components/Loading';
import NoiDungKhaoSatPage from '../../admin/noidungkhaosat/NoiDungKhaoSatPage';
import DoiTuongKhaoSatPage from '../../admin/doituongkhaosat/DoiTuongKhaoSatPage';
import NhomDoiTuongPage from '../../admin/nhomdoituong/NhomDoiTuongPage';
import { Divider } from 'antd';

const NoiDungDungChungPage = ({ keHoach, reloadDetail, loading, }) => {
    return (

        <div className="div-setting-cus">
            {loading ? <Loading></Loading> :
                <>
                    <Divider  variant="dashed" style={{  borderColor: '#7cb305' }} dashed className='m-1 p-2'>Nội dung dùng chung</Divider>
                    <NoiDungKhaoSatPage  showBreadcrumb={false} keHoach={keHoach}/>
                    <Divider  variant="dashed" style={{  borderColor: '#7cb305' }} dashed className='m-1 p-2'>Nhóm đối tượng được khảo sát</Divider>
                    <NhomDoiTuongPage showBreadcrumb={false} keHoach={keHoach}/>
                    <Divider  variant="dashed" style={{  borderColor: '#7cb305' }} dashed className='m-1 p-2'>Đối tượng được khảo sát</Divider>
                    <DoiTuongKhaoSatPage  showBreadcrumb={false} keHoach={keHoach}/>
                    
                 </>}
        </div >
    );
};

export default NoiDungDungChungPage;
