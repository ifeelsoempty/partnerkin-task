<?php


class Service
{
    public static function getData()
    {
        $paramsPath = ROOT . '/db/db_params.php';
        $params = include($paramsPath);
        $db = Db::getConnection();

        if ($_GET && (md5($_GET['auth_key']) == $params['auth_key'])) {
            $result = $db->query("SELECT * FROM `customer-data`");

            $i = 0;
            while ($row = $result->fetch()) {
                $data[$i]['id'] = $row['id'];
                $data[$i]['name'] = $row['name'];
                $data[$i]['email'] = $row['email'];
                $data[$i]['city'] = $row['city'];
                $data[$i]['number'] = $row['number'];
                $data[$i]['business'] = $row['business'];
                $data[$i]['salary'] = $row['salary'];
                $data[$i]['stage'] = $row['stage'];
                $data[$i]['date'] = $row['date'];
                $data[$i]['time'] = $row['time'];
                $i++;
            }
        } else {
            $data = "You have no access";
        }

        return $data;
    }

    public static function createCustomer($data)
    {
        $db = Db::getConnection();
        echo $data->name;

        $data = $db->query("INSERT INTO `customer-data` (`name`, `email`, `city`, `number`, `business`, `salary`, `stage`) VALUES ('" . $data->name . "','" . $data->email . "','" . $data->city . "','" . $data->number . "','" . $data->business . "','" . $data->salary . "','" . $data->stage . "');")->fetch();

        return $data;
    }
}
