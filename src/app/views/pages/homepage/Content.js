// import images
import Hero_person from "app/assets/images/Hero/person.png";

import figma from "app/assets/images/Skills/figma.png";
import sketch from "app/assets/images/Skills/sketch.png";
import ps from "app/assets/images/Skills/ps.png";
import reactjs from "app/assets/images/Skills/react.png";
import nodejs from "app/assets/images/Skills/node.png";
import python from "app/assets/images/Skills/python.png";

import services_logo1 from "app/assets/images/Services/logo1.png";
import services_logo2 from "app/assets/images/Services/logo2.png";
import services_logo3 from "app/assets/images/Services/logo3.png";

import project1 from "app/assets/images/projects/img1.png";
import project2 from "app/assets/images/projects/img2.png";
import project3 from "app/assets/images/projects/img3.png";
import person_project from "app/assets/images/banner/web_developing.gif";

import avatar1 from "app/assets/images/Testimonials/avatar1.png";
import avatar2 from "app/assets/images/Testimonials/avatar2.png";
import avatar3 from "app/assets/images/Testimonials/avatar3.png";
import avatar4 from "app/assets/images/Testimonials/avatar4.png";

import Hireme_person from "app/assets/images/Hireme/person.png";
import Hireme_person2 from "app/assets/images/Hireme/person2.png";

import hoa01 from "app/assets/images/banner/hoa-1.jpg";
import hoa02 from "app/assets/images/banner/hoa-2.jpg";
import hoa04 from "app/assets/images/banner/hoa-4.jpg";

// import icons from react-icons
import { GrMail } from "react-icons/gr";
import { MdArrowForward, MdCall } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiServiceLine, RiProjectorLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";
export const content = {
  nav: [
    {
      link: "#home",
      icon: TbSmartHome,
    },
    {
      link: "#skills",
      icon: BiUser,
    },
    {
      link: "#services",
      icon: RiServiceLine,
    },
    {
      link: "#projects",
      icon: RiProjectorLine,
    },
    {
      link: "#contact",
      icon: MdOutlinePermContactCalendar,
    },
  ],
  hero: {
    title: "VNPT FORM Khảo sát thu thập ý kiến",
    firstName: "VNPT",
    LastName: "LONG AN",
    btnText: "Xây dựng biểu mẫu",
    image: Hero_person,
    hero_content: [
      {
        count: "14+",
        text: "Các định dạng biểu mẫu trên các trang web khác nhau.",
      },
      {
        count: "38+",
        text: "Các loại cấu hình các dạng biểu mẫu.",
      },
    ],
  },
  skills: {
    title: "VNPT Form",
    subtitle: "Hoạt động thế nào",
    skills_content: [
      {
        name: "Bước 1",
        para: "Truy cập vào trang web của chúng tôi và đăng nhập vào tài khoản của bạn.",
        logo: figma,
      },
      {
        name: "Bước 2",
        para: "Tạo biểu mẫu mới bằng cách sử dụng công cụ thiết kế biểu mẫu trên trang web.",
        logo: nodejs,
      },
      {
        name: "Bước 3",
        para: "Tùy chỉnh và thiết kế biểu mẫu theo ý muốn của bạn, bao gồm các trường và các loại câu hỏi.",
        logo: ps,
      },
      {
        name: "Bước 4",
        para: "Chia sẻ biểu mẫu khảo sát một cách nhanh chóng và dễ dàng với người dùng khác bằng cách chọn các phương tiện truyền thông hoặc liên kết.",
        logo: reactjs,
      },
      {
        name: "Bước 5",
        para: "Sử dụng các công cụ thống kê để xem kết quả và phân tích dữ liệu từ các câu trả lời được nhận.",
        logo: sketch,
      },
      {
        name: "Bước 6",
        para: "Tải xuống các câu trả lời hoặc dữ liệu thống kê để sử dụng cho mục đích phân tích hoặc báo cáo của bạn.",
        logo: python,
      },
    ],
    icon: MdArrowForward,
  },
  services: {
    title: "Ứng dụng",
    subtitle: "Triễn khai trên nhiều nền tảng",
    service_content: [
      {
        title: "Phát triển Web",
        para: "Trên trang web của chúng tôi, bạn có thể dễ dàng tạo các biểu mẫu khảo sát tùy chỉnh. Điều này giúp thu thập thông tin một cách hiệu quả, từ đó hỗ trợ quyết định và chiến lược kinh doanh.",
        logo: services_logo1,
      },
      {
        title: "Thiết kế UI/UX",
        para: "Với ứng dụng web, người dùng có thể truy cập và điền biểu mẫu từ bất kỳ thiết bị nào có kết nối internet. Tính năng này mang lại sự linh hoạt tối đa, cho phép thu thập dữ liệu mọi lúc, mọi nơi.",
        logo: services_logo2,
      },
      {
        title: "Ứng dụng Mini App",
        para: "Mini app trên Zalo mở ra một kênh mới để chia sẻ và thu thập dữ liệu khảo sát. Với lượng người dùng lớn của Zalo, việc phát tán biểu mẫu và thu hút người tham gia trở nên dễ dàng và nhanh chóng hơn bao giờ hết.",
        logo: services_logo3,
      },
    ],
  },
  Projects: {
    title: "Các biểu mẫu",
    subtitle: "Đã được phát triển",
    image: person_project,
    project_content: [
      {
        title: "Khảo sát dân cư",
        image: hoa01,
      },
      {
        title: "Khảo sát hạ tầng mạng",
        image: hoa02,
      },
      {
        title: "Khảo sát hài lòng",
        image: hoa04,
      },
    ],
  },
  Testimonials: {
    title: "Đánh giá",
    subtitle: "Được đánh giá tích cực",
    testimonials_content: [
      {
        review:
          "“In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar1,
        name: "JOHN DOE",
      },
      {
        review:
          "“In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar2,
        name: "Tom Alex",
      },
      {
        review:
          "“In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar3,
        name: "Johnny",
      },
      {
        review:
          "“In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar4,
        name: "ROBBIN",
      },
    ],
  },
  Hireme: {
    title: "VNPT",
    subtitle: "Hỗ trợ tận tâm",
    image1: Hireme_person,
    image2: Hireme_person2,
    para: "VNPT luôn cam kết cung cấp sự hỗ trợ tận tâm cho khách hàng trong quá trình sử dụng dịch vụ của chúng tôi. Chúng tôi có đội ngũ nhân viên chuyên nghiệp và giàu kinh nghiệm, luôn sẵn lòng giải đáp mọi thắc mắc và hỗ trợ khách hàng giải quyết vấn đề một cách nhanh chóng và hiệu quả.",
    btnText: "Xem thêm",
  },
  Contact: {
    title: "Liên hệ với chúng tôi",
    subtitle: "Thông tin",
    social_media: [
      {
        text: "vahao.lan@vnpt.vn",
        icon: GrMail,
        link: "mailto:vahao.lan@vnpt.vn",
      },
      {
        text: "+91 1234 56778",
        icon: MdCall,
        link: "vahao.lan@vnpt.vn",
      },
      {
        text: "codeaprogram",
        icon: BsInstagram,
        link: "",
      },
    ],
  },
  Footer: {
    text: "All © Copy Right Reserved 2024",
  },
};
