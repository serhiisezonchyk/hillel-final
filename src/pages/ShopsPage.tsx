import HelmetMetadata from '@/components/shared/HelmetMetadata';

const ShopsPage = () => {
  return (
    <div className="mt-2">
      <HelmetMetadata title="Shops | Comfy" />
      <div className="container">
        <div className="prose">
          <h1 className="capitalize text-foreground">Our shops</h1>
          <span className="text-muted-foreground">Here you can see adresses of our shops.</span>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d324824.31564326386!2d29.808912277221676!3d50.50272773026857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cd7225a41e99%3A0x3ad50ce1d888124d!2sCOMFY!5e0!3m2!1sru!2sua!4v1724244154684!5m2!1sru!2sua"
          className="border-none w-full h-[500px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ShopsPage;
