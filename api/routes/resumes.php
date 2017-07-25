<?php

$app->group('/resumes/', function()
{
    
    ////Return one resume url: /api/resumes/:id method: get
    $this->get('[{id}]', function( $request, $response,$args)
    {
        try {
            //set database collection 
            $collection = $this->db->resumes;
            $document = $collection->findOne(['_id' =>  $args['id']]);

            return $this->response->withJson($document);
        } catch (Exception $e) {
           $error = [
                "message" => "Error while reading candidate resume",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
        }
    });


    ////Update one resume record  url: /api/resumes/ method: put
    $this->put('[{id}]', function ($request, $response, $args) {
        try {
            $input = $request->getParsedBody();
            $collection = $this->db->resumes;
            $updateResult = $collection->updateOne(
                ['_id' => $args['id']],
                ['$set' =>  $input],
                ['upsert' =>  true]
            );

            $updateResultMessage = [
                "message" => "Successful operation, updated records: ". $updateResult->getModifiedCount(),
                "updated_records" => $updateResult->getModifiedCount()
            ];

            return $this->response->withJson($updateResultMessage );
          
          } catch (Exception $e) {
            $error = [
                "message" => "Error adding resume",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
           return $this->response->withJson($error,500); 
         }
    });

    //// Delete one resume with given id
    $this->delete('[{id}]', function ($request, $response, $args) {
        try {
            $collection = $this->db->resumes;
            $deleteResult = $collection->deleteOne(['_id' => $args['id']]);
            $deleteResultMessage = [
                "message" => "Successful operation, deleted records: ". $deleteResult->getDeletedCount(),
                "deleted_records" => $deleteResult->getDeletedCount()
            ];

            return $this->response->withJson($deleteResultMessage);
        } catch (Exception $e) {
            $error = [
                "message" => "Error trying to delete the resume",
                "error" => $e->getMessage(),
                "error_code" =>  $e->getCode()
            ];
            return $this->response->withJson($error,500); 
        }
    });
    

});//end of resumes group