<?php

$app->group('/jobs/', function()
{
    
    ////Get all jobs  url: /api/jobs/ method: get
    $this->get('', function()
    {
        try {
            //set database collection 
            $collection = $this->db->jobs;
            
            $cursor = $collection->find()->toArray();     
            return $this->response->withJson($cursor);
        } catch (Exception $e) {
           $error = [
                "message" => "Error adding job position",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
        }
    });


    ////Insert new job position  url: /api/jobs/ method: post
    $this->post('', function ($request, $response) {
        try {
            $input = $request->getParsedBody();

            $collection = $this->db->jobs;
       
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
                "message" => "Error adding job position",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
        }
    });

    ////Update one job position record  url: /api/jobs/ method: put
    $this->put('[{id}]', function ($request, $response, $args) {
        try {
            $input = $request->getParsedBody();
            $collection = $this->db->jobs;
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
                "message" => "Error adding job position",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
         }
    });

    //// Delete one job position with given id
    $this->delete('[{id}]', function ($request, $response, $args) {
        try {
            $collection = $this->db->jobs;
            $deleteResult = $collection->deleteOne(['_id' => (int)$args['id']]);
            $deleteResultMessage = [
                "message" => "Successful operation, deleted records: ". $deleteResult->getDeletedCount(),
                "deleted_records" => $deleteResult->getDeletedCount()
            ];

            return $this->response->withJson($deleteResultMessage);
        } catch (Exception $e) {
            $error = [
                "message" => "Error trying to delete the job position",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
            return $this->response->withJson($error,500); 
        }
    });
    

});//end of jobs group