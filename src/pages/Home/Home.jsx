import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "antd";
const Home = () => {
  const navigate = useNavigate();
  const onFinish = (value) => {

    if(!value.code.includes('-'))  return console.log('error')
    const string = value.code.split("-");
    const idService = string[0];
    const typeService = string[1];
    if (typeService === "c") {
      navigate(`/travel/cliente/${idService}`);
      return;
    }
    if (typeService === "p") {
      navigate(`/travel/proveedor/${idService}`);
      return;
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <header className="flex  flex-col  content-center">
        <img className="h-32" src="/public/logo/logoescote.png" alt="logo" />
        <h1 className="font-bold text-3xl text-center mt-6">
          Service <span className={"text-sm font-semibold"}>Tracking</span>
        </h1>
      </header>

      <section className="my-32">
        <Form
          layout="vertical"
          className="flex flex-col justify-center items-center"
          onFinish={onFinish}
        >
          <span className="text-xl text-sky-700 font-bold mb-14">
            Código de servicio
          </span>
          <Form.Item
            className="text-center inline-block"
            name="code"
            rule={[{ required: true, message: "El código es requerido" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item label=" ">
            <Button
              className="bg-sky-800 font-bold hover:bg-sky-950"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Ir al Servicio
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};


export default Home;
