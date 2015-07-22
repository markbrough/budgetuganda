<?php

  $mysqli = new mysqli('localhost', 'uganda', 'uganda123', 
                       'admin_mof');
  $data = array();
  $query = "SELECT SectorName, VoteFunctionName, Amount, count(*) 
    AS NumEntries
    FROM cga_dashboard 
    GROUP BY SectorName, VoteFunctionName;";
  $result = $mysqli->query($query);
  $amount = 0;
  
  while($row = $result->fetch_array(MYSQL_ASSOC)) {
    $sector_hash = md5(serialize($row['SectorName']));
    $vote_function_hash = md5(serialize($row['VoteFunctionName']));
    $sector_slug = strtolower(preg_replace('~[^\\pL\d]+~u', '-', 
                      $row['SectorName']));
    $vote_function_slug = strtolower(preg_replace('~[^\\pL\d]+~u', '-',
                      $row['VoteFunctionName']));
    
    $data[] = array(
      "sector" => array(
        "taxonomy" => "uganda-sector",
        "id" => "$sector_hash",
        "ref" => array(
          "\$ref" => "classifier",
          "\$id" => "$sector_hash"
        ),
        "name" => "$sector_slug",
        "label" => $row['SectorName']
      ),
      "amount" => intval($row['Amount']),
      "num_entries" => $row['NumEntries'],
      "vote_function_name" => array(
        "taxonomy" => "uganda-vote-function",
        "id" => $vote_function_hash,
        "ref" => array(
          "\$ref" => "classifier",
          "\$id" => $vote_function_hash
        ),
        "name" => $vote_function_slug,
        "label" => $row['VoteFunctionName']
      )
    );
    $amount += $row['Amount'];
  }
  $jsondata = array(
    "drilldown" => $data,
    "summary" => array(
      "amount" => $amount,
      "num_drilldowns" => $result->num_rows
    )
  );

  header('Content-Type: application/json');
  echo json_encode($jsondata);
  
  $result -> close();
  $mysqli -> close();
?>