<?php


class Service
{
    public static function getData()
    {
        $db = Db::getConnection();

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
            $i++;
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
