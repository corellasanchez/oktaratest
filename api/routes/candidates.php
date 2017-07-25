<?php

$app->group('/candidates/', function()
{
    
    ////Get all candidates  url: /api/candidates/ method: get
    $this->get('', function()
    {
        try {
            //set database collection 
            $collection = $this->db->candidates;
            $options = ['sort' => ['name' => 1]];

            $cursor = $collection->find([],$options)->toArray();
           
            return $this->response->withJson($cursor);
        } catch (Exception $e) {
           $error = [
                "message" => "Error adding candidate",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
        }
    });

    ////Insert new candidate  url: /api/candidates/ method: post
    $this->post('', function ($request, $response) {
        try {
            $input = $request->getParsedBody();

            $collection = $this->db->candidates;

            //format date for mongodb ISODate format 
            $input['date_of_birth'] = new MongoDB\BSON\UTCDateTime((new DateTime($input['date_of_birth']))->getTimestamp()*1000);
        
            //insert the record 
            $insertOneResult = $collection->insertOne($input);

            $insertResultMessage = [
                "message" => "Successful operation, inserted record id: ". $insertOneResult->getInsertedId(),
                "inserted_record_id" => $insertOneResult->getInsertedId()
            ];

            // return the result
            return $this->response->withJson($insertResultMessage);
        
        } catch (Exception $e) {
            $error = [
                "message" => "Error adding candidate",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
        }
    });

    ////Update one candidate record  url: /api/candidates/ method: put
    $this->put('[{id}]', function ($request, $response, $args) {
        try {
            $input = $request->getParsedBody();
            $collection = $this->db->candidates;

            //format date for mongodb ISODate format 
            $input['date_of_birth'] = new MongoDB\BSON\UTCDateTime((new DateTime($input['date_of_birth']))->getTimestamp()*1000);

            $updateResult = $collection->updateOne(
                ['_id' => (int)$args['id']],
                ['$set' =>  $input]
            );
            $updateResultMessage = [
                "message" => "Successful operation, updated records: ". $updateResult->getModifiedCount(),
                "updated_records" => $updateResult->getModifiedCount()
            ];

            return $this->response->withJson($updateResultMessage );
          
          } catch (Exception $e) {
            $error = [
                "message" => "Error adding candidate",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
         }
    });

    //// Delete one candidate with given id
    $this->delete('[{id}]', function ($request, $response, $args) {
        try {
            $collection = $this->db->candidates;
            $deleteResult = $collection->deleteOne(['_id' => (int)$args['id']]);
            $deleteResultMessage = [
                "message" => "Successful operation, deleted records: ". $deleteResult->getDeletedCount() . ''.  $args['id'],
                "deleted_records" => $deleteResult->getDeletedCount()
            ];

            return $this->response->withJson($deleteResultMessage);
        } catch (Exception $e) {
            $error = [
                "message" => "Error trying to delete the candidate",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
            return $this->response->withJson($error,500); 
        }
    });
    
});//end of candidates group