import ContactUsBanner from "../components/contactbanner";
import ContactForm from "../components/contactform";
import Mapcomponent from "../components/mapcomponent";

export default function Contact(){
    return(
            <div>
                <ContactUsBanner/>
                <ContactForm/>
                <Mapcomponent/>
            </div>
    );
}