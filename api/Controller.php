<?php
include_once ROOT . '\Service.php';


function getData()
{
    $customer_data = array();
    $customer_data = Service::getData();

    echo json_encode($customer_data);

    return true;
}

function createCustomer()
{
    $json_str = file_get_contents('php://input');
    $data = json_decode($json_str);

    Service::createCustomer($data);

    return true;
}
