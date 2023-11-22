import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

function NavigationSignpost() {
  return (
    <Breadcrumb spacing="8px" separator=">">
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink as={Link} to="/">
          Welcome
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/home">
          Overview
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/home/logactivity">
          Log Activity
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default NavigationSignpost;
