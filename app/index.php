<?php
/**
 * Created by PhpStorm.
 * User: mike
 */


require_once('../lib/phpQuery.php');

$app = new \Phalcon\Mvc\Micro();

//Retrieves all robots
$app->get('/api/robots', function() {

});

//Searches for robots with $name in their name
$app->get('/api/robots/search/{name}', function($name) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://www.amazon.com');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $html = curl_exec($ch);
    curl_close($ch);
    $doc = phpQuery::newDocument($html);
    $content = $doc->find('div.amabot_center .unified_widget .fluid');
    $products = array();

    // parsing product items
    foreach ($content->elements as $val)
    {
        $pq = pq($val);
        $product = array();
        $product['title'] = $pq->find('div.inner a.title')->attr('title');
        $product['image'] = $pq->find('div.inner a.title div.imageContainer')->html();
        $price = $pq->find('div.inner span.s9Price')->html();
        $product['price'] = (strlen($price) == 0)? 'price is not defined' : $price;
        $description = $pq->find('div.inner div.gry')->html();
        $product['description'] = (strlen($description) == 0)? 'description is not defined' : $description;
        $products[] = $product;
    }

    // match criteria
    $match = false;
    foreach ($products as $val)
    {
        foreach ($val as $key => $sval)
        {
            if (in_array($key,array('image','price'))) continue; // here we avoid fields where we are not going to search defined criteria
            if (stristr($sval, $name)) $match = true;
        }
        if ($match)
        {
            echo json_encode($val);
            break;
        }
    }
});

$app->handle();